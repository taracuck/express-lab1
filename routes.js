"use strict";

// Require the Express module
const express = require("express");

// Create a new router object
const routes = express.Router();

let cartItems = [
  {
    id: 1,
    product: "Snickers",
    price: 1.0,
    quantity: 25,
  },
  {
    id: 2,
    product: "Gatorade",
    price: 2.5,
    quantity: 50,
  },
  {
    id: 3,
    product: "Trail Mix",
    price: 1.5,
    quantity: 10,
  },
  {
    id: 4,
    product: "Ham and Cheese Sandwich",
    price: 5.0,
    quantity: 5,
  },
  {
    id: 5,
    product: "Gatorade Zero",
    price: 2.5,
    quantity: 50,
  },
  {
    id: 6,
    product: "M&Ms",
    price: 0.5,
    quantity: 50,
  },
  {
    id: 7,
    product: "Jolly Rancher",
    price: 0.25,
    quantity: 50,
  },
  {
    id: 8,
    product: "Hershey's Chocolate",
    price: 2.0,
    quantity: 10,
  },
  {
    id: 9,
    product: "Trollis",
    price: 1.5,
    quantity: 5,
  },
  {
    id: 10,
    product: "Lollipop",
    price: 0.25,
    quantity: 10,
  },
  {
    id: 11,
    product: "Ice Cream Sandwich",
    price: 2.5,
    quantity: 3,
  },
];

let nextId = 6;

// GET /cart-items
routes.get("/cart-items", (req, res) => {
  let filteredItems = cartItems;
  let maxPrice = req.query.maxPrice;
  let prefix = req.query.prefix;
  let pageSize = req.query.pageSize;
  if (maxPrice) {
    filteredItems = filteredItems.filter((item) => item.price <= maxPrice);
  }
  if (prefix) {
    filteredItems = filteredItems.filter((item) =>
      item.product.toLowerCase().startsWith(prefix.toLowerCase().trim())
    );
  }
  if (pageSize) {
    filteredItems = filteredItems.slice(0, pageSize);
  }
  res.json(filteredItems);
  res.status(200);
});

// GET /cart-items/:id
routes.get("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = cartItems.findIndex((item) => item.id === id);
  if (index != -1) {
    res.json(cartItems[index]);
    res.status(200);
  } else {
    res.status(404);
    res.send(`ID Not Found`);
  }
});

// POST /cart-items
routes.post("/cart-items", (req, res) => {
  let cartItem = req.body;
  cartItem.id = nextId++;
  cartItems.push(cartItem);
  res.status(201);
  res.json(cartItem);
});

// PUT /cart-items/:id
routes.put("/cart-items/:id", (req, res) => {
  let updatedItem = req.body;
  let id = parseInt(req.params.id);
  updatedItem.id = id;
  let index = cartItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    cartItems[index] = updatedItem;
    res.status(200);
    res.json(updatedItem);
  } else {
    res.status(404);
    res.send(`No item with id: ${id}`);
  }
});

// DELETE /cart-items/:id
routes.delete("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = cartItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404);
    res.send(`No item with id: ${id}`);
  }
});

module.exports = routes;
