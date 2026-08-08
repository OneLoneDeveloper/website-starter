import { pathToFileURL } from "node:url";

import { Product } from "../features/products/productModel.js";
import {
  connectDatabase,
  disconnectDatabase,
} from "../services/databaseClient.js";

const sampleProducts = [
  {
    name: "Aurora Lamp",
    description: "A sculptural desk lamp with a warm glow.",
    price: 59.99,
    currency: "USD",
    inStock: true,
  },
  {
    name: "Northwind Backpack",
    description: "A lightweight pack for daily commutes and weekend trips.",
    price: 84.5,
    currency: "USD",
    inStock: true,
  },
  {
    name: "Echo Water Bottle",
    description: "Insulated steel bottle with a soft grip finish.",
    price: 32,
    currency: "USD",
    inStock: false,
  },
];

export async function seedProducts() {
  await connectDatabase();

  await Promise.all(
    sampleProducts.map(async (product) => {
      await Product.findOneAndUpdate(
        { name: product.name },
        { $set: product },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
      );
    }),
  );

  const count = await Product.countDocuments();

  console.log(`Seeded ${count} products.`);
}

async function main() {
  try {
    await seedProducts();
  } catch (error) {
    console.error("Unable to seed products.", error);
    process.exitCode = 1;
  } finally {
    await disconnectDatabase();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
