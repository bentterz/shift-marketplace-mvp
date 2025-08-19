import Link from "next/link";
import Container from "@/components/Container";

export default function HomePage() {
  return (
    <Container>
      <div style={{display: "grid", gap: 16}}>
        <h1 style={{fontSize: 32, margin: 0}}>{process.env.NEXT_PUBLIC_SITE_NAME || "Shift"}</h1>
        <p>Buy & sell used bikes, parts, and clothing. Built for cyclists, not scammers.</p>
        <div style={{display: "flex", gap: 12}}>
          <Link href="/sell" style={{padding: "10px 14px", borderRadius: 8, background: "black", color: "white"}}>Sell something</Link>
          <Link href="/listings" style={{padding: "10px 14px", borderRadius: 8, border: "1px solid #ddd"}}>Browse listings</Link>
        </div>
        <div style={{marginTop: 24, fontSize: 14, opacity: 0.8}}>
          ⚙️ MVP: No auth or uploads yet. AI can draft your listing from a short note and optional image URLs.
        </div>
      </div>
    </Container>
  );
}
