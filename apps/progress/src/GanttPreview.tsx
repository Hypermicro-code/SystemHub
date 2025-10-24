import React from "react";

type Row = { id?: string; name?: string; start?: string; end?: string };

function daysBetween(a: Date, b: Date) {
  return Math.max(1, Math.ceil((b.getTime() - a.getTime()) / 86400000));
}
function fmt(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function GanttPreview({ rows }: { rows: Row[] }) {
  const parsed = React.useMemo(() => {
    const safe = (rows || []).map((r) => {
      const s = r.start ? new Date(r.start) : null;
      const e = r.end ? new Date(r.end) : null;
      return { ...r, s, e };
    }).filter(r => r.s && r.e && !isNaN(r.s!.getTime()) && !isNaN(r.e!.getTime()));

    if (!safe.length) return { min: null as Date | null, max: null as Date | null, items: [] as any[] };

    const min = new Date(Math.min(...safe.map(r => r.s!.getTime())));
    const max = new Date(Math.max(...safe.map(r => r.e!.getTime())));
    // normaliser til midnatt
    min.setHours(0,0,0,0); max.setHours(0,0,0,0);

    const span = daysBetween(min, max);
    const items = safe.map(r => {
      const offset = daysBetween(min, r.s!) - 1;
      const length = daysBetween(r.s!, r.e!);
      return { id: r.id || r.name || "?", name: r.name || r.id || "?", offset, length };
    });
    return { min, max, items, span };
  }, [rows]);

  if (!parsed.min || !parsed.max || !parsed.items.length) {
    return (
      <div style={{ padding: 12, opacity: 0.8 }}>
        (Ingen gyldige datoer å vise – fyll inn <strong>start</strong> og <strong>slutt</strong> i tabellen)
      </div>
    );
  }

  const dayWidth = 24; // px pr dag
  const height = 28;
  const labelW = 200;

  const headerDays = Array.from({ length: parsed.span! }, (_, i) => i);

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", fontSize: 12, opacity: 0.9, marginBottom: 6 }}>
        <div style={{ width: labelW }} />
        <div style={{ display: "flex" }}>
          {headerDays.map(i => {
            const d = new Date(parsed.min!);
            d.setDate(parsed.min!.getDate() + i);
            return (
              <div
                key={i}
                style={{
                  width: dayWidth,
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                  textAlign: "center"
                }}
                title={fmt(d)}
              >
                {String(d.getDate()).padStart(2, "0")}
              </div>
            );
          })}
        </div>
      </div>

      {/* Items */}
      <div>
        {parsed.items.map((it, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", height }}>
            <div style={{ width: labelW, paddingRight: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {it.name}
            </div>
            <div style={{ position: "relative" }}>
              {/* offset */}
              <div style={{ width: it.offset * dayWidth, display: "inline-block", height: 1 }} />
              {/* bar */}
              <div
                style={{
                  display: "inline-block",
                  height: 18,
                  width: Math.max(1, it.length * dayWidth),
                  background: "#1e90ff",
                  border: "1px solid #60a5fa",
                  borderRadius: 4,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.35)"
                }}
                title={`${it.name} (${it.length} d)`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
