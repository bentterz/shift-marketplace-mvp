"use client";

import React, { useState } from "react";
import Container from "@/components/Container";
import { CONDITIONS } from "@/data/taxonomy";

type Draft = {
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  condition: string;
  price: number;
  currency: string;
  location?: string;
  attributes: Record<string, string | number | boolean>;
  photos: string[];
};

export default function SellPage() {
  const [rough, setRough] = useState("");
  const [imageUrls, setImageUrls] = useState<string>("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    try {
      setLoading(true);
      setError(null);
      const resp = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: rough,
          imageUrls: imageUrls.split(/\s+/).filter(Boolean),
          currency: "GBP"
        })
      });
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data?.error || "Failed to generate");
      }
      setDraft(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function publish() {
    if (!draft) return;
    try {
      setPublishing(true);
      const resp = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft)
      });
      if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data?.error || "Failed to publish");
      }
      setDraft(null);
      setRough("");
      setImageUrls("");
      alert("Listing published!");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setPublishing(false);
    }
  }

  return (
    <Container>
      <h1 style={{fontSize: 24, marginTop: 0}}>Sell an item</h1>
      <div style={{display: "grid", gap: 12, maxWidth: 800}}>
        <label>Tell us about the item (anything you know)</label>
        <textarea value={rough} onChange={e => setRough(e.target.value)} rows={6} placeholder='e.g., "Large 2020 Trek Fuel EX 9.7, carbon frame, GX, 29er, serviced, a few scratches"'></textarea>

        <label>Optional: public image URLs (one per line)</label>
        <textarea value={imageUrls} onChange={e => setImageUrls(e.target.value)} rows={3} placeholder='https://images.example.com/bike1.jpg\nhttps://images.example.com/bike2.jpg'></textarea>

        <div style={{display: "flex", gap: 8}}>
          <button onClick={generate} disabled={loading} style={{padding: "10px 14px", borderRadius: 8, background: "black", color: "white"}}>
            {loading ? "Generating..." : "Generate draft"}
          </button>
          {draft && (
            <button onClick={publish} disabled={publishing} style={{padding: "10px 14px", borderRadius: 8, border: "1px solid #ddd"}}>
              {publishing ? "Publishing..." : "Publish listing"}
            </button>
          )}
        </div>

        {error && <div style={{color: "crimson"}}>{error}</div>}

        {draft && (
          <div style={{marginTop: 16, padding: 16, border: "1px solid #eee", borderRadius: 12}}>
            <h2 style={{marginTop: 0}}>Draft preview</h2>
            <div style={{display: "grid", gap: 8}}>
              <strong>Title</strong>
              <input value={draft.title} onChange={e => setDraft({...draft, title: e.target.value})} />

              <strong>Description</strong>
              <textarea rows={6} value={draft.description} onChange={e => setDraft({...draft, description: e.target.value})} />

              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12}}>
                <div>
                  <strong>Category</strong>
                  <input value={draft.category} onChange={e => setDraft({...draft, category: e.target.value})} />
                </div>
                <div>
                  <strong>Subcategory</strong>
                  <input value={draft.subcategory || ""} onChange={e => setDraft({...draft, subcategory: e.target.value})} />
                </div>
              </div>

              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12}}>
                <div>
                  <strong>Condition</strong>
                  <select value={draft.condition} onChange={e => setDraft({...draft, condition: e.target.value})}>
                    {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <strong>Price (£)</strong>
                  <input type="number" value={(draft.price/100).toFixed(2)} onChange={e => setDraft({...draft, price: Math.round(parseFloat(e.target.value || "0")*100)})} />
                </div>
                <div>
                  <strong>Location</strong>
                  <input value={draft.location || ""} onChange={e => setDraft({...draft, location: e.target.value})} />
                </div>
              </div>

              <strong>Attributes</strong>
              <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: 8}}>
                {Object.entries(draft.attributes || {}).map(([k,v]) => (
                  <div key={k} style={{display: "grid", gap: 4}}>
                    <label style={{fontSize: 12, opacity: 0.8}}>{k}</label>
                    <input value={String(v)} onChange={e => setDraft({...draft, attributes: {...draft.attributes, [k]: e.target.value}})} />
                  </div>
                ))}
              </div>

              <strong>Photos</strong>
              <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
                {draft.photos?.map((url, idx) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={idx} src={url} alt={`photo-${idx}`} style={{width: 140, height: 100, objectFit: "cover", borderRadius: 8, border: "1px solid #eee"}} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
