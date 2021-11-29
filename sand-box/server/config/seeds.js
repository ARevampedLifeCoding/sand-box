const db = require("./connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Dogs" },
    { name: "Cats" },
    { name: "Lions" },
    { name: "Tigers" },
    { name: "Bears" },
  ]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Fluffy",
      description: "Coolest dog ever!.",
      image: "cookie-tin.jpg",
      category: categories[0]._id,
      price: 50,
      quantity: 1,
    },
    {
      name: "Whiskers",
      description: "Evil cat ready to take over the world!",
      image: "canned-coffee.jpg",
      category: categories[0]._id,
      price: 50.0,
      quantity: 1,
    },
    {
      name: "Simba",
      category: categories[1]._id,
      description: "King of the jungle.",
      image: "toilet-paper.jpg",
      price: 50.0,
      quantity: 1,
    },
    {
      name: "Raja",
      category: categories[1]._id,
      description: " Formally belonged to a princess.",
      image: "soap.jpg",
      price: 50.0,
      quantity: 1,
    },
    {
      name: "Baloo",
      category: categories[1]._id,
      description: "Great.",
      image: "wooden-spoons.jpg",
      price: 14.99,
      quantity: 100,
    },
  ]);

  console.log("products seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
