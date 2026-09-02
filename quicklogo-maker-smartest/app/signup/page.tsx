"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({name:"", email:"", password:""});
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    });
    if (!res.ok) {
      const data = await res.json().catch(()=>({}));
      return setError(data.error || "Signup failed");
    }
    router.push("/dashboard");
  }

  return <main className="center"><div className="card" style={{width:"min(460px,92%)"}}>
    <h1>Create account</h1>
    {error && <div className="error">{error}</div>}
    <form className="form" onSubmit={submit}>
      <div><label>Name</label><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
      <div><label>Email</label><input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
      <div><label>Password</label><input required type="password" minLength={8} value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></div>
      <button className="btn btn-dark">Create account</button>
    </form>
  </div></main>;
}
