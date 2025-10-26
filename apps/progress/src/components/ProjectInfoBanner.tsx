/* ============================================
   ProjectInfoBanner – enkel banner for Full-modus
   ============================================ */
import React from "react"

export default function ProjectInfoBanner({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="project-banner app-chrome">
      <div className="pb-title">{title}</div>
      {subtitle && <div className="pb-sub">{subtitle}</div>}
      <style>{`
        .project-banner {
          padding: 12px 16px; border-bottom: 1px solid #2223;
          background: #1f1a16; color: #fff;
        }
        .pb-title { font-weight: 700; font-size: 18px; }
        .pb-sub { opacity: .8; margin-top: 2px; }
      `}</style>
    </header>
  )
}
