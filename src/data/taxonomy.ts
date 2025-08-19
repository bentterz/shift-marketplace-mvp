export const CATEGORIES = {
  Bikes: [
    "Mountain Bike",
    "Road Bike",
    "Gravel Bike",
    "Hybrid/Commuter",
    "BMX",
    "Kids Bike",
    "E-Bike"
  ],
  Parts: [
    "Frames",
    "Forks",
    "Rear Shocks",
    "Wheels",
    "Tyres",
    "Groupsets/Drivetrain",
    "Brakes",
    "Cockpit (Bars/Stem)",
    "Seatposts/Saddles",
    "Pedals",
    "Headsets/Bottom Brackets"
  ],
  Clothing: [
    "Jerseys",
    "Shorts/Bibs",
    "Jackets",
    "Gloves",
    "Helmets",
    "Shoes",
    "Eyewear",
    "Protection (Pads)"
  ],
  Accessories: [
    "Bags/Packs",
    "Lights",
    "Computers/GPS",
    "Tools/Pumps",
    "Bottles/Cages",
    "Locks",
    "Trainers"
  ]
} as const;

export const CONDITIONS = ["New","Like New","Good","Fair","For Parts"] as const;
