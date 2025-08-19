import Container from "@/components/Container";
import ListingCard from "@/components/ListingCard";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic"; // ensure fresh data in dev/prod

export default async function ListingsPage() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
    include: { photos: true },
  });

  return (
    <Container>
      <h1 style={{ fontSize: 24, marginTop: 0 }}>Latest listings</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {listings.map((l: any) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </Container>
  );
}
