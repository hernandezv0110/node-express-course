const express = require("express");
const { products } = require("./data");

const app = express();

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

//gets and returns json with all the products
app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

//gets and returns json with a specific product that was matched with ID
app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  if (isNaN(idToFind)) {
    res.status(404).send("That product was not found.");
  }
  if (idToFind == 0 || idToFind > products.length) {
    res.status(404).send("That product was not found.");
  }
  const product = products.find((p) => p.id == idToFind);
  res.json(product);
});

//get query
//added min and max price logic to return only the products that fit within the range
app.get("/api/v1/query", (req, res) => {
  let { search, limit, minPrice, maxPrice } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (minPrice) {
    sortedProducts = sortedProducts.filter(
      (product) => product.price >= Number(minPrice)
    );
  }

  if (maxPrice) {
    sortedProducts = sortedProducts.filter(
      (product) => product.price <= Number(maxPrice)
    );
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (sortedProducts.length < 1) {
    return res.status(200).json({ success: true, data: [] });
  }

  res.json(sortedProducts);
});

//returns a 404 if its something else
app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
