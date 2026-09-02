import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="small">AI LOGO CREATOR</div>
          <h1>Create a professional logo from one idea.</h1>
          <p>Describe your brand, choose a style and colors, then generate logo concepts from your browser.</p>
          <Link className="btn btn-dark" href="/signup">Start creating free</Link>
        </div>
      </section>

      <section className="container grid grid-3">
        <div className="card"><h3>Fast generation</h3><p className="small">One simple brief creates a ready-to-preview logo concept.</p></div>
        <div className="card"><h3>Saved projects</h3><p className="small">Keep brand briefs and generated logos in your account.</p></div>
        <div className="card"><h3>AI-ready architecture</h3><p className="small">Swap the local SVG generator for a real image model API when ready.</p></div>
      </section>
    </main>
  );
}
