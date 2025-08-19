import Link from "next/link";
import Container from "@/components/Container";
import ListingCard from "@/components/ListingCard";

async function fetchListings() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/listings`, { cache: "no-store" });
  return res.json();
}

export default async function ListingsPage() {
  const listings = await fetchListings();
  return (
    <Container>
      <h1 style={{fontSize: 24, marginTop: 0}}>Latest listings</h1>
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16}}>
        {listings.map((l: any) => <ListingCard key={l.id} listing={l} />)}
      </div>
    </Container>
  );
}
