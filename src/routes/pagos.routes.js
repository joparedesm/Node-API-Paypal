import { Router } from "express";
import { crearOrden, capturarOrden, cancelarOrden } from "../controllers/pagos.controller.js";

const router = Router();


router.get('/crear-orden', crearOrden);

router.get('/capturar-orden', capturarOrden);

router.get('/cancelar-orden', cancelarOrden);


export default router;
