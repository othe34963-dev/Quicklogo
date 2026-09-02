"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Project = { id:string; brandName:string; description:string; style:string; colors:string; createdAt:string; logos:{id:string; imageUrl:string}[] };

export default function Dashboard() {
  const [projects,setProjects] = useState<Project[]>([]);
  const [form,setForm] = useState({brandName:"",description:"",style:"Modern",colors:"Black and white"});
  const [error,setError] = useState("");
  const [busy,setBusy] = useState(false);

  async function load() {
    const res = await fetch("/api/projects");
    if (res.ok) setProjects(await res.json());
  }
  useEffect(()=>{ load(); },[]);

  async function generate(e:React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError("");
    const res = await fetch("/api/generate", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(form)
    });
    const data = await res.json().catch(()=>({}));
    setBusy(false);
    if (!res.ok) return setError(data.error || "Generation failed");
    setForm({brandName:"",description:"",style:"Modern",colors:"Black and white"});
    load();
  }

  return <main className="container" style={{padding:"40px 0"}}>
    <div className="row">
      <section className="card">
        <h2>Create a logo</h2>
        <form className="form" onSubmit={generate}>
          <div><label>Brand name</label><input required value={form.brandName} onChange={e=>setForm({...form,brandName:e.target.value})}/></div>
          <div><label>Describe the brand</label><textarea required value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div>
          <div><label>Style</label><select value={form.style} onChange={e=>setForm({...form,style:e.target.value})}><option>Modern</option><option>Minimal</option><option>Luxury</option><option>Tech</option><option>Playful</option><option>Traditional</option></select></div>
          <div><label>Colors</label><input value={form.colors} onChange={e=>setForm({...form,colors:e.target.value})}/></div>
          {error && <div className="error">{error}</div>}
          <button className="btn btn-dark" disabled={busy}>{busy ? "Generating..." : "Generate logo"}</button>
        </form>
      </section>
      <section>
        <div className="card">
          <h2>Your projects</h2>
          {projects.length===0 && <p className="small">No projects yet.</p>}
          <div className="grid">
            {projects.map(p=><div className="project-card" key={p.id}>
              {p.logos[0] ? <img className="project-thumb" src={p.logos[0].imageUrl} alt={p.brandName}/> : <div className="project-thumb"/>}
              <div><strong>{p.brandName}</strong><div className="small">{p.style} • {p.colors}</div><div className="small">{p.description}</div></div>
            </div>)}
          </div>
        </div>
        <div className="card" style={{marginTop:22}}>
          <h3>Next production upgrades</h3>
          <p className="small">Connect a real image model, object storage, password hashing with Argon2/bcrypt, email verification, billing, rate limits, and downloadable SVG/PNG assets.</p>
          <Link className="btn btn-light" href="/">Back home</Link>
        </div>
      </section>
    </div>
  </main>;
}
