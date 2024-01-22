
const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;

const productManager = new ProductManager('db.json'); 

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts(limit);
  res.json({ products });
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);
  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.get('/', (req, res) => {
  const welcomeMessage = `
    <h1>Bienvenido a la página principal</h1>
    <p>¡Gracias por visitar nuestro proyecto!</p>
    <p>Aquí tienes algunas rutas que puedes explorar:</p>
    <ul>
      <li><a href="/products">Ver todos los productos</a></li>
      <li><a href="/products/1">Ver detalles del Producto 1</a></li>
      <!-- Agrega más enlaces según sea necesario -->
    </ul>
  `;
  res.send(welcomeMessage);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
