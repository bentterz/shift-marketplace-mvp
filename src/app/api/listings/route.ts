import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { CreateListingSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function GET() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
    include: { photos: true }
  });
  return NextResponse.json(listings);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateListingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", issues: parsed.error.format() }, { status: 422 });
    }

    const pence = parsed.data.price;
    const created = await prisma.listing.create({
  data: {
    title: parsed.data.title,
    description: parsed.data.description,
    category: parsed.data.category,
    subcategory: parsed.data.subcategory || null,
    condition: parsed.data.condition,
    price: pence,
    currency: parsed.data.currency,
    location: parsed.data.location || null,
    attributes: parsed.data.attributes,  // ← only once
    photos: {
      create: (parsed.data.photos || []).map((url, idx) => ({
        url,
        order: idx,
      })),
    },
  },
  include: { photos: true },
});


    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
