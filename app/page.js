import Projects from "@/components/Projects";
import { getProjects } from "@/lib/store";
import { profile, experience, skills, education, languages } from "@/lib/data";
export const dynamic = "force-dynamic";
export default async function Home() {
  const projects = await getProjects();
  return (
    <>
      <nav className="nav"><div className="wrap">
        <a href="#top" className="logo">Bosco<span>.</span></a>
        <div className="links">{[["À propos", "about"], ["Formations", "experience"], ["Compétences", "skills"], ["Projets", "projects"], ["Contact", "contact"]].map(([l, id]) => <a key={id} href={`#${id}`}>{l}</a>)}</div>
      </div></nav>

      <header id="top" className="hero wrap">
        <div className="fade">
          <span className="pill">Disponible pour de nouvelles opportunités</span>
          <h1>{profile.name}</h1>
          <h2>{profile.role} · Laravel & React</h2>
          <p>{profile.bio}</p>
          <div className="row">
            <a className="btn" href="#projects">Voir mes projets</a>
            <a className="btn ghost" href={profile.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
        <div className="avatar fade" />
      </header>

      <section id="about" className="wrap sec">
        <h2 className="t">À propos</h2>
        <div className="stats">
          <div className="card"><b>3+</b><span>expériences professionnelles</span></div>
          <div className="card"><b>SaaS</b><span>plateformes de gestion</span></div>
          <div className="card"><b>{profile.location}</b><span>Bénin</span></div>
          <div className="card"><b>{languages.length}</b><span>langues : {languages.join(", ")}</span></div>
        </div>
      </section>

      <section id="experience" className="wrap sec">
        <h2 className="t">Formations</h2>
        <div className="timeline">
          {experience.map((e) => (
            <div key={e.role} className="card item">
              <div className="between"><h3>{e.role}</h3><small className="muted">{e.date}</small></div>
              <p className="muted">{e.org}</p>
              <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          ))}
          {education.map((e) => (
            <div key={e.title} className="card item edu">
              <div className="between"><h3>{e.title}</h3><small className="muted">{e.date}</small></div>
              <p className="muted">{e.place}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="wrap sec">
        <h2 className="t">Compétences</h2>
        <div className="grid">
          {Object.entries(skills).map(([k, v]) => (
            <div key={k} className="card pad"><h3>{k}</h3><div className="tags">{v.map((s) => <span key={s}>{s}</span>)}</div></div>
          ))}
        </div>
      </section>

      <section id="projects" className="wrap sec">
        <h2 className="t">Projets</h2>
        <Projects projects={projects} />
      </section>

      <section id="contact" className="wrap sec">
        <h2 className="t">Me contacter</h2>
        <div className="grid c4">
          <a className="card pad contact" href={profile.whatsapp} target="_blank" rel="noreferrer"><b>WhatsApp</b><span>{profile.phone}</span></a>
          <a className="card pad contact" href={`mailto:${profile.email}`}><b>E-mail</b><span>{profile.email}</span></a>
          <a className="card pad contact" href={profile.github} target="_blank" rel="noreferrer"><b>GitHub</b><span>@RethiceDev</span></a>
          <a className="card pad contact" href={profile.facebook} target="_blank" rel="noreferrer"><b>Facebook</b><span>Bosco Rethice</span></a>
        </div>
      </section>
      <footer className="foot">© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
