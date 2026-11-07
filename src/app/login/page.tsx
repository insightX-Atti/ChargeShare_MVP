"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sora, Manrope } from "next/font/google";
import { createClient } from "@/utils/supabase/client";

const sora = Sora({ subsets: ["latin"], weight: ["600", "800"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <main className={`login-page ${manrope.className}`}>
      <style jsx>{`
        .login-page {
          --bg: #000000;
          --panel: #0b0b0f;
          --line: #1f1f29;
          --text: #f5f5f7;
          --muted: #8b8b9c;
          --accent: #22d3ee;
          min-height: 100vh;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          background: var(--bg);
          color: var(--text);
        }

        /* Left brand panel */
        .brand-panel {
          background: var(--panel);
          border-right: 1px solid var(--line);
          padding: 56px 64px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .logo {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 20px;
          font-weight: 800;
          color: var(--text);
          text-decoration: none;
        }

        .logo-mark {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--accent);
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-content {
          max-width: 460px;
        }

        .brand-content h1 {
          font-size: 40px;
          line-height: 1.2;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 24px;
        }

        .brand-content p {
          color: var(--muted);
          font-size: 17px;
          line-height: 1.8;
          margin: 0 0 40px;
        }

        .points {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .points li {
          display: flex;
          align-items: center;
          gap: 14px;
          color: #d4d4de;
          font-size: 15px;
        }

        .points svg {
          flex-shrink: 0;
          color: var(--accent);
        }

        .brand-footer {
          color: var(--muted);
          font-size: 13px;
        }

        /* Right form panel */
        .form-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 56px 32px;
        }

        .form-box {
          width: 100%;
          max-width: 400px;
        }

        .mobile-logo {
          display: none;
          margin-bottom: 48px;
        }

        .form-heading h2 {
          font-size: 30px;
          font-weight: 800;
          letter-spacing: -0.01em;
          margin: 0 0 12px;
        }

        .form-heading p {
          color: var(--muted);
          font-size: 15px;
          line-height: 1.6;
          margin: 0 0 40px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 26px;
        }

        label {
          color: #e2e2ea;
          font-size: 14px;
          font-weight: 700;
        }

        .input-wrap {
          position: relative;
        }

        input {
          width: 100%;
          box-sizing: border-box;
          background: var(--bg);
          border: 1px solid #2a2a36;
          border-radius: 10px;
          padding: 15px 16px;
          color: var(--text);
          font-family: inherit;
          font-size: 15px;
          outline: none;
          transition:
            border-color 0.2s,
            box-shadow 0.2s;
        }

        input.has-toggle {
          padding-right: 70px;
        }

        input::placeholder {
          color: #4f4f63;
        }

        input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.18);
        }

        .password-toggle {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: transparent;
          color: var(--muted);
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .password-toggle:hover {
          color: var(--text);
        }

        .error-message {
          padding: 14px 16px;
          border-radius: 10px;
          margin-bottom: 26px;
          font-size: 14px;
          line-height: 1.5;
          color: #fca5a5;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .login-btn {
          width: 100%;
          margin-top: 8px;
          padding: 16px;
          border: none;
          border-radius: 10px;
          background: var(--accent);
          color: #000;
          font-family: inherit;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          transition:
            background 0.2s,
            box-shadow 0.2s;
        }

        .login-btn:hover:not(:disabled) {
          background: #67e8f9;
          box-shadow: 0 8px 24px rgba(34, 211, 238, 0.28);
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .register-text {
          margin-top: 32px;
          text-align: center;
          font-size: 14px;
          color: var(--muted);
        }

        .register-text a {
          color: var(--accent);
          font-weight: 700;
          text-decoration: none;
        }

        .register-text a:hover {
          text-decoration: underline;
        }

        .login-btn:focus-visible,
        .password-toggle:focus-visible,
        .register-text a:focus-visible,
        .logo:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 3px;
        }

        @media (max-width: 900px) {
          .login-page {
            grid-template-columns: 1fr;
          }

          .brand-panel {
            display: none;
          }

          .mobile-logo {
            display: inline-flex;
          }

          .form-panel {
            align-items: flex-start;
            padding: 48px 24px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
          }
        }
      `}</style>

      {/* Left brand panel */}
      <section className="brand-panel">
        <Link href="/" className="logo">
          <span className="logo-mark">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
            </svg>
          </span>
          <span className={sora.className}>ChargeShare</span>
        </Link>

        <div className="brand-content">
          <h1 className={sora.className}>
            Find a charger near you, or earn from your own.
          </h1>
          <p>
            ChargeShare connects EV drivers with home charger owners across
            India, so charging is never far away.
          </p>

          <ul className="points">
            <li>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Find chargers near you
            </li>
            <li>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Book a slot in a few taps
            </li>
            <li>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              List your own charger and set your price
            </li>
          </ul>
        </div>

        <div className="brand-footer">© 2026 ChargeShare</div>
      </section>

      {/* Right form panel */}
      <section className="form-panel">
        <div className="form-box">
          <Link href="/" className="logo mobile-logo">
            <span className="logo-mark">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
              </svg>
            </span>
            <span className={sora.className}>ChargeShare</span>
          </Link>

          <div className="form-heading">
            <h2 className={sora.className}>Sign in</h2>
            <p>Enter your email and password to access your account.</p>
          </div>

          <form onSubmit={handleLogin}>
            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="input-wrap">
                <input
                  id="password"
                  className="has-toggle"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="register-text">
            Don&apos;t have an account?{" "}
            <Link href="/register">Create one</Link>
          </div>
        </div>
      </section>
    </main>
  );
}