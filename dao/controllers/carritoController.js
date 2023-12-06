import fs from "fs";
import { generateID } from "../../helpers/generateID.js";

export const crearCarrito = async (req, res) => {
  const newCart = req.body;
  let carritos = JSON.parse(fs.readFileSync("./data/carritos.json", "utf8"));
  if (!Array.isArray(carritos)) {
    carritos = [];
  }
  newCart.id = generateID();
  carritos.push(newCart);
  fs.writeFileSync("./data/carritos.json", JSON.stringify(carritos, null, 2));
  res.status(201).json(newCart);
};

export const obtenerCarrito = async (req, res) => {
  const cid = req.params.cid;
  const carritos = JSON.parse(fs.readFileSync("./data/carritos.json", "utf8"));
  const cart = carritos.find((c) => c.id === cid);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
};

export const agregarProductoAcarrito = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity || 1;
  const carritos = JSON.parse(fs.readFileSync("./data/carritos.json", "utf8"));
  const cart = carritos.find((c) => c.id === cid);

  if (cart) {
    const existingProduct = cart.products.find((p) => p.product === pid);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    fs.writeFileSync("./data/carritos.json", JSON.stringify(carritos, null, 2));
    res.json(cart);
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
};
