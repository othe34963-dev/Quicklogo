"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) return setError("Invalid email or password");
    router.push("/dashboard");
  }

  return <main className="center"><div className="card" style={{width: "min(460px,92%)"}}>
    <h1>Login</h1>
    {error && <div className="error">{error}</div>}
    <form className="form" onSubmit={submit}>
      <div><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} type="email" required /></div>
      <div><label>Password</label><input value={password} onChange={e=>setPassword(e.target.value)} type="password" required /></div>
      <button className="btn btn-dark">Login</button>
    </form>
  </div></main>;
}
