import React from "react";

type Photo = { url: string };
type Listing = {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  subcategory?: string | null;
  photos: Photo[];
};

function formatPrice(pence: number, currency: string) {
  const amount = (pence / 100).toFixed(2);
  return `${currency} ${amount}`.replace("GBP ", "£");
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const cover = listing.photos?.[0]?.url;
  return (
    <div style={{border: "1px solid #e6e6e6", borderRadius: 12, overflow: "hidden"}}>
      <div style={{height: 180, background: "#f6f6f6"}}>
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt={listing.title} style={{width: "100%", height: "100%", objectFit: "cover"}} />
        )}
      </div>
      <div style={{padding: 12}}>
        <div style={{fontWeight: 600, marginBottom: 4}}>{listing.title}</div>
        <div style={{opacity: 0.8, marginBottom: 8}}>{listing.category}{listing.subcategory ? ` • ${listing.subcategory}` : ""}</div>
        <div style={{fontWeight: 700}}>{formatPrice(listing.price, listing.currency)}</div>
      </div>
    </div>
  );
}
