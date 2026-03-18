const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin superuser
  const adminPassword = await bcrypt.hash("admin123456", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@autobon.ca" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@autobon.ca",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Create sample cars
  const sampleCars = [
    {
      title: "2023 Tesla Model 3",
      year: 2023,
      make: "Tesla",
      model: "Model 3",
      trim: "Long Range",
      price: 45990,
      mileage: "5,234 km",
      fuelType: "Electric",
      transmission: "Automatic",
      bodyType: "Sedan",
      color: "White",
      condition: "Used",
      location: "Toronto, ON",
      description: "Excellent condition Tesla Model 3 with low mileage. Full self-driving capability included. Premium interior with white seats.",
      badge: "Featured",
      priceRating: "Great Price",
      noAccident: true,
      biWeekly: "$599",
      downPayment: "$0 down",
      features: ["Autopilot", "Premium Interior", "Heated Seats", "Navigation System", "Backup Camera", "Bluetooth Connection"],
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", position: 0 },
        ],
      },
    },
    {
      title: "2022 BMW X5",
      year: 2022,
      make: "BMW",
      model: "X5",
      trim: "xDrive40i",
      price: 68500,
      mileage: "12,890 km",
      fuelType: "Gasoline",
      transmission: "Automatic",
      bodyType: "SUV",
      color: "Black",
      condition: "Used",
      location: "Vancouver, BC",
      description: "Premium BMW X5 with M Sport package. Panoramic sunroof, heads-up display, and Harman Kardon sound system.",
      badge: "Premium",
      priceRating: "Good Price",
      noAccident: true,
      biWeekly: "$899",
      downPayment: "$0 down",
      features: ["Panoramic Sunroof", "Heated Seats", "Leather Seats", "Navigation System", "Backup Camera", "Cruise Control"],
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", position: 0 },
        ],
      },
    },
    {
      title: "2021 Honda CR-V",
      year: 2021,
      make: "Honda",
      model: "CR-V",
      trim: "Touring",
      price: 32995,
      mileage: "28,456 km",
      fuelType: "Hybrid",
      transmission: "CVT",
      bodyType: "SUV",
      color: "Silver",
      condition: "Used",
      location: "Calgary, AB",
      description: "Fuel-efficient Honda CR-V Hybrid with touring package. Honda Sensing suite included.",
      badge: "Best Seller",
      priceRating: "Fair Price",
      noAccident: true,
      biWeekly: "$429",
      downPayment: "$0 down",
      features: ["Honda Sensing", "Apple CarPlay", "Heated Seats", "Power Seats", "Backup Camera", "Lane Assist"],
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", position: 0 },
        ],
      },
    },
    {
      title: "2023 Ford Mustang GT",
      year: 2023,
      make: "Ford",
      model: "Mustang GT",
      trim: "Premium",
      price: 52750,
      mileage: "3,201 km",
      fuelType: "Gasoline",
      transmission: "Manual",
      bodyType: "Coupe",
      color: "Red",
      condition: "Used",
      location: "Montreal, QC",
      description: "Powerful Ford Mustang GT with 5.0L V8 engine. Performance package with Brembo brakes and MagneRide suspension.",
      badge: "Hot Deal",
      priceRating: "Great Price",
      noAccident: true,
      biWeekly: "$689",
      downPayment: "$0 down",
      features: ["Performance Package", "Leather Seats", "Sync 3", "Backup Camera", "Bluetooth Connection", "Remote Start"],
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", position: 0 },
        ],
      },
    },
    {
      title: "2022 Toyota RAV4",
      year: 2022,
      make: "Toyota",
      model: "RAV4",
      trim: "XLE",
      price: 38500,
      mileage: "15,678 km",
      fuelType: "Gasoline",
      transmission: "Automatic",
      bodyType: "SUV",
      color: "Blue",
      condition: "Used",
      location: "Ottawa, ON",
      description: "Reliable Toyota RAV4 with Toyota Safety Sense 2.0. Perfect family vehicle with spacious interior.",
      badge: "Featured",
      priceRating: "Good Price",
      noAccident: true,
      biWeekly: "$499",
      downPayment: "$0 down",
      features: ["Toyota Safety Sense", "Apple CarPlay", "Heated Seats", "Backup Camera", "Cruise Control", "Keyless Entry"],
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1621007947382-9bced5c7b1f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", position: 0 },
        ],
      },
    },
  ];

  for (const car of sampleCars) {
    const created = await prisma.car.create({ data: car });
    console.log(`✅ Car created: ${created.title}`);
  }

  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
