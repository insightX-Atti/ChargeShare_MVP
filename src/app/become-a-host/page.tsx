"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import Link from "next/link";
import { Sora, Manrope } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["600", "800"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "700"] });

const CONNECTORS = [
  { label: "Type 2", color: "#22d3ee" },
  { label: "CCS2", color: "#f43f9e" },
  { label: "GB/T", color: "#fbbf24" },
  { label: "CHAdeMO", color: "#a78bfa" },
  { label: "Standard AC Socket", color: "#a3e635" },
];

const SLOTS = [
  "Available 24/7",
  "Morning",
  "Afternoon",
  "Evening",
  "Custom Schedule",
];

export default function BecomeAHostPage() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    charger_type: "Type 2",
    price_per_kwh: "",
    availability: "Available 24/7",
    description: "",
  });

  const [message, setMessage] = useState("");

  const active =
    CONNECTORS.find((c) => c.label === form.charger_type) ?? CONNECTORS[0];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Your charger is submitted. Drivers nearby will see it soon.");
    console.log("Charger details:", form);
  };

  return (
    <main className={`host-page ${manrope.className}`}>
      <style jsx>{`
        .host-page {
          --bg: #000000;
          --panel: #0b0b0f;
          --line: #1c1c25;
          --text: #f5f5f7;
          --muted: #8b8b9c;
          --accent: ${active.color};
          min-height: 100vh;
          background:
            radial-gradient(
              800px 450px at 95% -10%,
              rgba(244, 63, 158, 0.1),
              transparent 70%
            ),
            radial-gradient(
              800px 450px at 0% 110%,
              rgba(34, 211, 238, 0.08),
              transparent 70%
            ),
            var(--bg);
          color: var(--text);
          padding: 88px 32px 110px;
        }

        .host-container {
          max-width: 1180px;
          margin: 0 auto;
        }

        /* Header: title left, text right */
        .host-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 56px;
          margin-bottom: 64px;
        }

        .host-header h1 {
          flex: 1.2;
          font-size: clamp(32px, 4.6vw, 50px);
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .host-header p {
          flex: 1;
          max-width: 400px;
          color: var(--muted);
          font-size: 17px;
          line-height: 1.8;
          margin: 0;
        }

        /* Ticket preview (horizontal) */
        .ticket {
          position: relative;
          display: grid;
          grid-template-columns: auto minmax(0, 1.6fr) auto auto;
          align-items: center;
          background: var(--panel);
          border: 1px solid color-mix(in srgb, var(--accent) 45%, #1c1c25);
          border-radius: 28px;
          overflow: hidden;
          margin-bottom: 40px;
          box-shadow: 0 0 60px color-mix(in srgb, var(--accent) 14%, transparent);
          transition:
            border-color 0.3s,
            box-shadow 0.3s;
        }

        .ticket::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 6px;
          background: var(--accent);
          transition: background 0.3s;
        }

        .ticket-cell {
          padding: 36px 40px;
          min-width: 0;
        }

        .ticket-cell + .ticket-cell {
          border-left: 2px dashed var(--line);
        }

        .ticket-label {
          color: var(--muted);
          font-size: 13px;
          font-weight: 700;
          margin: 0 0 12px;
        }

        .badge {
          display: inline-block;
          background: var(--accent);
          color: #000;
          font-weight: 800;
          font-size: 14px;
          padding: 9px 18px;
          border-radius: 999px;
          white-space: nowrap;
          transition: background 0.3s;
        }

        .ticket-name {
          font-size: 22px;
          line-height: 1.3;
          font-weight: 800;
          margin: 0 0 8px;
          word-break: break-word;
        }

        .ticket-address {
          color: var(--muted);
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
          word-break: break-word;
        }

        .ticket-price {
          font-size: 36px;
          line-height: 1;
          font-weight: 800;
          color: var(--accent);
          margin: 0;
          white-space: nowrap;
          transition: color 0.3s;
        }

        .ticket-price small {
          font-size: 14px;
          font-weight: 500;
          color: var(--muted);
          margin-left: 8px;
        }

        .ticket-time {
          font-size: 16px;
          font-weight: 700;
          margin: 0;
          white-space: nowrap;
        }

        /* Form panel */
        .host-card {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 28px;
          padding: 56px;
        }

        .row {
          display: grid;
          gap: 40px;
          padding-bottom: 48px;
          margin-bottom: 48px;
          border-bottom: 1px solid var(--line);
        }

        .row.three {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .row.two {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .row.last {
          border-bottom: none;
          padding-bottom: 0;
          margin-bottom: 0;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 0;
        }

        label,
        .label {
          color: #e2e2ea;
          font-size: 15px;
          font-weight: 700;
        }

        input,
        textarea {
          background: #000;
          border: 1px solid #2a2a36;
          color: #fff;
          padding: 17px 20px;
          border-radius: 14px;
          outline: none;
          font-size: 15px;
          font-family: inherit;
          width: 100%;
          box-sizing: border-box;
          transition:
            border-color 0.2s,
            box-shadow 0.2s;
        }

        input::placeholder,
        textarea::placeholder {
          color: #4f4f63;
        }

        input:focus,
        textarea:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent);
        }

        textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }

        /* Chips */
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .chip {
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          color: var(--c);
          background: transparent;
          border: 1.5px solid color-mix(in srgb, var(--c) 45%, transparent);
          border-radius: 999px;
          padding: 12px 22px;
          cursor: pointer;
          transition:
            background 0.2s,
            color 0.2s,
            box-shadow 0.2s;
        }

        .chip:hover {
          background: color-mix(in srgb, var(--c) 14%, transparent);
        }

        .chip.on {
          background: var(--c);
          color: #000;
          border-color: var(--c);
          box-shadow: 0 0 24px color-mix(in srgb, var(--c) 40%, transparent);
        }

        .chip:focus-visible,
        .submit-btn:focus-visible,
        .back-link:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 4px;
        }

        /* Footer bar */
        .footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          margin-top: 56px;
          padding-top: 40px;
          border-top: 1px solid var(--line);
        }

        .back-link {
          color: #22d3ee;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: #f43f9e;
        }

        .submit-btn {
          min-width: 320px;
          padding: 20px 40px;
          border: none;
          border-radius: 18px;
          font-family: inherit;
          font-size: 17px;
          font-weight: 800;
          color: #000;
          cursor: pointer;
          background: linear-gradient(
            110deg,
            #22d3ee,
            #a78bfa,
            #f43f9e,
            #fbbf24,
            #22d3ee
          );
          background-size: 250% 100%;
          animation: flow 8s linear infinite;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow:
            0 12px 32px rgba(244, 63, 158, 0.32),
            0 0 40px rgba(34, 211, 238, 0.18);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        @keyframes flow {
          to {
            background-position: -250% 0;
          }
        }

        .success-message {
          margin-top: 32px;
          padding: 18px 22px;
          border-radius: 14px;
          background: rgba(163, 230, 53, 0.08);
          border: 1px solid rgba(163, 230, 53, 0.6);
          color: #bef264;
          font-weight: 600;
          line-height: 1.6;
        }

        /* Responsive */
        @media (max-width: 1000px) {
          .host-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }

          .ticket {
            grid-template-columns: 1fr 1fr;
          }

          .ticket-cell + .ticket-cell {
            border-left: none;
          }

          .ticket-cell:nth-child(n + 3) {
            border-top: 2px dashed var(--line);
          }

          .row.three {
            grid-template-columns: 1fr 1fr;
          }

          .row.two {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .host-page {
            padding: 56px 20px 80px;
          }

          .host-card {
            padding: 28px 22px;
          }

          .ticket {
            grid-template-columns: 1fr;
          }

          .ticket-cell {
            padding: 28px 26px;
          }

          .ticket-cell:nth-child(n + 2) {
            border-top: 2px dashed var(--line);
          }

          .row.three {
            grid-template-columns: 1fr;
          }

          .footer-bar {
            flex-direction: column-reverse;
            align-items: stretch;
            text-align: center;
          }

          .submit-btn {
            min-width: 0;
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .submit-btn {
            animation: none;
          }

          * {
            transition: none !important;
          }
        }
      `}</style>

      <div className="host-container">
        <header className="host-header">
          <h1 className={sora.className}>
            Your charger can earn while your car sleeps
          </h1>
          <p>
            List your home EV charger on ChargeShare, set your own price, and
            let drivers around you book it.
          </p>
        </header>

        {/* Live ticket preview */}
        <section className="ticket" aria-label="Live preview">
          <div className="ticket-cell">
            <span className="badge">{form.charger_type}</span>
          </div>

          <div className="ticket-cell">
            <h3 className={`ticket-name ${sora.className}`}>
              {form.name || "Your charger name"}
            </h3>
            <p className="ticket-address">
              {form.address || "Your address will appear here"}
            </p>
          </div>

          <div className="ticket-cell">
            <p className="ticket-label">Price</p>
            <p className={`ticket-price ${sora.className}`}>
              ₹{form.price_per_kwh || "--"}
              <small>per kWh</small>
            </p>
          </div>

          <div className="ticket-cell">
            <p className="ticket-label">Availability</p>
            <p className="ticket-time">{form.availability}</p>
          </div>
        </section>

        {/* Form */}
        <section className="host-card">
          <form onSubmit={handleSubmit}>
            {/* Row 1: three inputs side by side */}
            <div className="row three">
              <div className="field">
                <label htmlFor="name">Charger name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Home EV Charger"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="field">
                <label htmlFor="address">Station address</label>
                <input
                  id="address"
                  type="text"
                  placeholder="Enter your complete address"
                  required
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label htmlFor="price">Price per kWh (₹)</label>
                <input
                  id="price"
                  type="number"
                  min="1"
                  placeholder="e.g. 12"
                  required
                  value={form.price_per_kwh}
                  onChange={(e) =>
                    setForm({ ...form, price_per_kwh: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Row 2: two chip groups side by side */}
            <div className="row two">
              <div className="field">
                <span className="label">Connector type</span>
                <div className="chips" role="group" aria-label="Connector type">
                  {CONNECTORS.map((c) => (
                    <button
                      type="button"
                      key={c.label}
                      className={`chip ${
                        form.charger_type === c.label ? "on" : ""
                      }`}
                      style={{ "--c": c.color } as CSSProperties}
                      aria-pressed={form.charger_type === c.label}
                      onClick={() =>
                        setForm({ ...form, charger_type: c.label })
                      }
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <span className="label">Availability</span>
                <div className="chips" role="group" aria-label="Availability">
                  {SLOTS.map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={`chip ${form.availability === s ? "on" : ""}`}
                      style={{ "--c": active.color } as CSSProperties}
                      aria-pressed={form.availability === s}
                      onClick={() => setForm({ ...form, availability: s })}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3: details */}
            <div className="row last">
              <div className="field">
                <label htmlFor="details">Additional details</label>
                <textarea
                  id="details"
                  placeholder="Describe your charger, parking, access instructions..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Footer bar */}
            <div className="footer-bar">
              <Link href="/" className="back-link">
                ← Back to Home
              </Link>

              <button type="submit" className="submit-btn">
                Add my charging station
              </button>
            </div>

            {message && (
              <div className="success-message" role="status">
                {message}
              </div>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}