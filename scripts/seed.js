require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');

const catalog = [
  { name: 'Canvas Tote Bag', price: 450, categoryName: 'Accessories', inStock: true, description: 'A sturdy everyday tote with a reinforced base and an inner zip pocket.', imageUrl: 'https://picsum.photos/seed/tote/600/400' },
  { name: 'Leather Card Holder', price: 320, categoryName: 'Accessories', inStock: true, description: 'A slim card holder with four slots and a center pocket for folded bills.', imageUrl: 'https://picsum.photos/seed/cardholder/600/400' },
  { name: 'Bucket Hat', price: 280, categoryName: 'Accessories', inStock: false, description: 'A lightweight cotton bucket hat with a wide brim for sunny days.', imageUrl: 'https://picsum.photos/seed/hat/600/400' },
  { name: 'Cotton Crew Tee', price: 390, categoryName: 'Apparel', inStock: true, description: 'A soft, mid-weight crew neck tee that keeps its shape wash after wash.', imageUrl: 'https://picsum.photos/seed/tee/600/400' },
  { name: 'Linen Overshirt', price: 890, categoryName: 'Apparel', inStock: true, description: 'A relaxed linen overshirt that layers over a tee or wears on its own.', imageUrl: 'https://picsum.photos/seed/overshirt/600/400' },
  { name: 'Running Shorts', price: 520, categoryName: 'Apparel', inStock: false, description: 'Quick-dry running shorts with a zip pocket and a built-in liner.', imageUrl: 'https://picsum.photos/seed/shorts/600/400' },
  { name: 'Ceramic Mug Set', price: 640, categoryName: 'Home', inStock: true, description: 'A set of four glazed ceramic mugs, each holding about 350 ml.', imageUrl: 'https://picsum.photos/seed/mugs/600/400' },
  { name: 'Woven Table Mat', price: 210, categoryName: 'Home', inStock: true, description: 'A hand-woven table mat that protects surfaces from heat and spills.', imageUrl: 'https://picsum.photos/seed/mat/600/400' },
  { name: 'Scented Soy Candle', price: 350, categoryName: 'Home', inStock: true, description: 'A soy wax candle in a reusable jar with roughly forty hours of burn time.', imageUrl: 'https://picsum.photos/seed/candle/600/400' },
  { name: 'Bamboo Desk Organizer', price: 480, categoryName: 'Home', inStock: true, description: 'A three-compartment bamboo organizer for pens, notes, and small gadgets.', imageUrl: 'https://picsum.photos/seed/organizer/600/400' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  const categoryIds = {};
  for (const name of ['Accessories', 'Apparel', 'Home']) {
    const category = await Category.findOneAndUpdate({ name }, { name }, { upsert: true, new: true });
    categoryIds[name] = category._id;
  }

  await Product.deleteMany({});
  const docs = catalog.map(({ categoryName, ...fields }) => ({
    ...fields,
    category: categoryIds[categoryName],
    status: 'active',
  }));
  const created = await Product.insertMany(docs);

  console.log(`Seeded ${created.length} products in ${Object.keys(categoryIds).length} categories`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
