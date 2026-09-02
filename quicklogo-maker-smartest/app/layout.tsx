import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="header">
        <div className="container nav">
          <Link className="brand" href="/">QuickLogo Maker Smartest</Link>
          <nav className="navlinks">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login">Login</Link>
            <Link className="btn btn-dark" href="/signup">Create account</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} QuickLogo Maker Smartest. All rights reserved.</div>
      </footer>
    </>
  );
}
