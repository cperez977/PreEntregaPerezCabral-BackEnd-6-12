import fs from "fs/promises";
import path from "path";
import { generateID } from "../../helpers/generateID.js";

export const crearProducto = async (req, res) => {
  try {
    const newProduct = req.body;

    // Obtén la ruta completa al archivo productos.json
    const currentFileDirectory = path.dirname(
      new URL(import.meta.url).pathname.substring(1)
    );
    const filePath = path.join(
      currentFileDirectory,
      "..",
      "data",
      "productos.json"
    );

    // Lee los productos actuales del archivo
    let productos = await fs.readFile(filePath, "utf8");
    productos = JSON.parse(productos);

    // Añade el nuevo producto
    newProduct.id = generateID();
    productos.push(newProduct);

    // Escribe los productos actualizados en el archivo
    await fs.writeFile(filePath, JSON.stringify(productos, null, 2));

    res.status(201).json(newProduct);

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export const obtenerProductos = async (req, res) => {
  try {
    // Obtén la ruta completa al archivo productos.json
    const currentFileDirectory = path.dirname(
      new URL(import.meta.url).pathname.substring(1)
    );
    const filePath = path.join(
      currentFileDirectory,
      "..",
      "data",
      "productos.json"
    );

    
    const productosContent = await fs.readFile(filePath, "utf8");

    
    const productos = JSON.parse(productosContent);

    res.render("home", { productos });
   
    console.log('Productos:', productos);

  
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export const obtenerProducto = async (req, res) => {
  const pid = req.params.pid;
  const productos = JSON.parse(
    fs.readFileSync("./data/productos.json", "utf8")
  );
  const producto = productos.find((p) => p.id === pid);
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
};

export const actualizarProducto = async (req, res) => {
  const pid = req.params.pid;
  const updatedFields = req.body;
  const productos = JSON.parse(
    fs.readFileSync("./data/productos.json", "utf8")
  );
  const index = productos.findIndex((p) => p.id === pid);
  if (index !== -1) {
    // Actualiza solo los campos proporcionados en la solicitud POST
    for (const key in updatedFields) {
      if (Object.hasOwnProperty.call(updatedFields, key)) {
        productos[index][key] = updatedFields[key];
      }
    }
    fs.writeFileSync(
      "./data/productos.json",
      JSON.stringify(productos, null, 2)
    );
    res.json(productos[index]);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
};

export const eliminarProducto = async (req, res) => {
  const pid = req.params.pid;
  const productos = JSON.parse(
    fs.readFileSync("./data/productos.json", "utf8")
  );
  const index = productos.findIndex((p) => p.id === pid);
  if (index !== -1) {
    productos.splice(index, 1);
    fs.writeFileSync(
      "./data/productos.json",
      JSON.stringify(productos, null, 2)
    );
    res.json({ message: "Producto eliminado" });
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
};
