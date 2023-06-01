import express from 'express';
import rutasPagos from './routes/pagos.routes.js';
import { PORT } from './config.js';
import path from 'path';

const app = express();

app.use('/api/pagos',rutasPagos);

app.use(express.static(path.resolve('src/public')));

app.listen(PORT);

console.log("Servidor en el puerto: ", PORT);
