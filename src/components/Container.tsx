import Link from "next/link";
import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px" }}>
      {/* Simple Home button */}
      <nav style={{ marginBottom: 16 }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "6px 12px",
            background: "#eee",
            borderRadius: 6,
            textDecoration: "none",
            color: "#333",
            fontWeight: "bold",
          }}
        >
          Home
        </Link>
      </nav>

      {children}
    </div>
  );
}
