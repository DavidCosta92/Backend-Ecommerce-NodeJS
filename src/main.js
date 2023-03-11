import express from 'express'
import { PORT } from './PORT.js';
import { productsRouter } from './routes/productsRouter.js';
import { cartsRouter } from './routes/cartsRouter.js';

const app = express();

app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);

app.listen(PORT, () => console.log("Servidor activo"))