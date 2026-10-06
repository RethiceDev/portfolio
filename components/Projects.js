"use client";
import { useState } from "react";
export default function Projects({ projects }) {
  const [open, setOpen] = useState(null);
  const [img, setImg] = useState(0);
  const [cat, setCat] = useState("Tous");
  const cats = ["Tous", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  const shown = projects.filter((p) => cat === "Tous" || p.category === cat);
  if (!projects.length) return <p className="muted">Les projets arrivent bientôt.</p>;
  return (
    <>
      {cats.length > 2 && <div className="chips">{cats.map((c) => <button key={c} className={c === cat ? "chip on" : "chip"} onClick={() => setCat(c)}>{c}</button>)}</div>}
      <div className="grid">
        {shown.map((p) => (
          <article key={p.id} className="card proj" onClick={() => { setOpen(p); setImg(0); }}>
            <div className="thumb">{p.images?.[0] ? <img src={p.images[0]} alt={p.title} loading="lazy" /> : <span>{p.title[0]}</span>}</div>
            <div className="pad">
              <small className="muted">{[p.category, p.year].filter(Boolean).join(" · ")}</small>
              <h3>{p.title}</h3>
              <p className="clamp">{p.description}</p>
              <div className="tags">{(p.tech || []).slice(0, 4).map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
      {open && (
        <div className="modal" onClick={() => setOpen(null)}>
          <div className="box" onClick={(e) => e.stopPropagation()}>
            <button className="x" onClick={() => setOpen(null)}>×</button>
            {open.images?.length > 0 && (
              <>
                <img className="big" src={open.images[img]} alt={open.title} />
                {open.images.length > 1 && <div className="thumbs">{open.images.map((u, i) => <img key={u} src={u} alt="" className={i === img ? "on" : ""} onClick={() => setImg(i)} />)}</div>}
              </>
            )}
            <div className="pad">
              <small className="muted">{[open.category, open.year].filter(Boolean).join(" · ")}</small>
              <h3>{open.title}</h3>
              <p style={{ whiteSpace: "pre-line" }}>{open.description}</p>
              <div className="tags">{(open.tech || []).map((t) => <span key={t}>{t}</span>)}</div>
              <div className="row">
                {open.liveUrl && <a className="btn" href={open.liveUrl} target="_blank" rel="noreferrer">Voir le site</a>}
                {open.githubUrl && <a className="btn ghost" href={open.githubUrl} target="_blank" rel="noreferrer">Code source</a>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
