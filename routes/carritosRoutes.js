import express from "express";
import {
  crearCarrito,
  obtenerCarrito,
  agregarProductoAcarrito,
} from "../dao/controllers/carritoController.js"

const router = express.Router();

router.post("/", crearCarrito);

router.get("/:cid", obtenerCarrito);

router.post("/:cid/product/:pid", agregarProductoAcarrito);

export default router;
