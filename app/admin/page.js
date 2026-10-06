"use client";
import { useEffect, useState } from "react";
const empty = { title: "", category: "", description: "", tech: "", liveUrl: "", githubUrl: "", year: "", images: [] };
const compress = (file) => new Promise((res) => {
  const img = new Image();
  img.onload = () => {
    const s = Math.min(1, 1600 / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = img.width * s; c.height = img.height * s;
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    c.toBlob(res, "image/jpeg", 0.85);
  };
  img.src = URL.createObjectURL(file);
});
export default function Admin() {
  const [auth, setAuth] = useState(null);
  const [pw, setPw] = useState("");
  const [list, setList] = useState([]);
  const [f, setF] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const load = async () => setList(await (await fetch("/api/projects", { cache: "no-store" })).json());
  useEffect(() => { fetch("/api/auth").then((r) => r.json()).then((d) => { setAuth(d.ok); if (d.ok) load(); }); }, []);
  const login = async (e) => {
    e.preventDefault();
    const r = await fetch("/api/auth", { method: "POST", body: JSON.stringify({ password: pw }) });
    if (r.ok) { setAuth(true); load(); } else setMsg("Mot de passe incorrect");
  };
  const logout = async () => { await fetch("/api/auth", { method: "DELETE" }); setAuth(false); };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const upload = async (e) => {
    setBusy(true); setMsg("Envoi des images…");
    const urls = [];
    for (const file of e.target.files) {
      const fd = new FormData(); fd.append("file", await compress(file), "photo.jpg");
      const r = await fetch("/api/upload", { method: "POST", body: fd });
      if (r.ok) urls.push((await r.json()).url);
    }
    setF((x) => ({ ...x, images: [...x.images, ...urls] })); setBusy(false); setMsg("");
  };
  const save = async (e) => {
    e.preventDefault(); setBusy(true);
    const body = { ...f, tech: typeof f.tech === "string" ? f.tech.split(",").map((t) => t.trim()).filter(Boolean) : f.tech };
    const r = await fetch("/api/projects", { method: f.id ? "PUT" : "POST", body: JSON.stringify(body) });
    setBusy(false);
    if (r.ok) { setF(empty); setMsg("Projet enregistré ✓"); load(); } else setMsg("Erreur lors de l'enregistrement");
  };
  const del = async (id) => { if (confirm("Supprimer ce projet ?")) { await fetch(`/api/projects?id=${id}`, { method: "DELETE" }); load(); } };
  const edit = (p) => { setF({ ...p, tech: (p.tech || []).join(", ") }); window.scrollTo({ top: 0, behavior: "smooth" }); };

  if (auth === null) return <main className="wrap sec">Chargement…</main>;
  if (!auth) return (
    <main className="wrap sec" style={{ maxWidth: 380 }}>
      <form className="card pad form" onSubmit={login}>
        <h3>Administration</h3>
        <input type="password" placeholder="Mot de passe" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus />
        <button className="btn">Se connecter</button>
        {msg && <small style={{ color: "#dc2626" }}>{msg}</small>}
      </form>
    </main>
  );
  return (
    <main className="wrap sec">
      <div className="between"><h2 className="t" style={{ margin: 0 }}>Panel admin</h2>
        <div className="row"><a className="btn ghost" href="/">Voir le site</a><button className="btn ghost" onClick={logout}>Déconnexion</button></div></div>
      <form className="card pad form" onSubmit={save} style={{ margin: "24px 0" }}>
        <h3>{f.id ? "Modifier le projet" : "Nouveau projet"}</h3>
        <input required placeholder="Titre *" value={f.title} onChange={set("title")} />
        <div className="two">
          <input placeholder="Catégorie (ex : SaaS, Mobile, Web)" value={f.category} onChange={set("category")} />
          <input placeholder="Année" value={f.year} onChange={set("year")} />
        </div>
        <textarea required rows={5} placeholder="Description *" value={f.description} onChange={set("description")} />
        <input placeholder="Technologies (séparées par des virgules : Laravel, MySQL, React)" value={f.tech} onChange={set("tech")} />
        <div className="two">
          <input placeholder="Lien du site (https://…)" value={f.liveUrl} onChange={set("liveUrl")} />
          <input placeholder="Lien GitHub (https://…)" value={f.githubUrl} onChange={set("githubUrl")} />
        </div>
        <label className="file">📷 Ajouter des photos<input type="file" accept="image/*" multiple onChange={upload} hidden /></label>
        <div className="thumbs">{f.images.map((u) => <div key={u} className="tb"><img src={u} alt="" /><button type="button" onClick={() => setF({ ...f, images: f.images.filter((x) => x !== u) })}>×</button></div>)}</div>
        <div className="row"><button className="btn" disabled={busy}>{busy ? "Patiente…" : f.id ? "Mettre à jour" : "Publier le projet"}</button>
          {f.id && <button type="button" className="btn ghost" onClick={() => setF(empty)}>Annuler</button>}</div>
        {msg && <small>{msg}</small>}
      </form>
      <div className="grid">
        {list.map((p) => (
          <div key={p.id} className="card pad">
            {p.images?.[0] && <img src={p.images[0]} alt="" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }} />}
            <h3>{p.title}</h3><small className="muted">{p.category}</small>
            <div className="row" style={{ marginTop: 10 }}><button className="btn ghost" onClick={() => edit(p)}>Modifier</button><button className="btn ghost" style={{ color: "#dc2626" }} onClick={() => del(p.id)}>Supprimer</button></div>
          </div>
        ))}
      </div>
    </main>
  );
}
