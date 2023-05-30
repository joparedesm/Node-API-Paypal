import express from 'express'
import rutasPagos from './routes/pagos.routes.js'
import { PORT } from './config.js';

const app = express();

app.use('/api/pagos',rutasPagos)



app.listen(PORT);
console.log("Servidor en el puerto: ", PORT)
