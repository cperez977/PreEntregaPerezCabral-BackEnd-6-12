import mongoose from 'mongoose';

// Esquema para el producto
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: Number,
  category: String,
  thumbnails: [String],
  id: String,
});

// Crear el modelo del producto
const Product = mongoose.model('Product', productSchema);

export default Product;