import { HOST, PAYPAL_API, PAYPAL_Client, PAYPAL_KEY } from "../config.js";
import axios from "axios";

// export const crearOrden = (req, res)=>res.send("Orden Cancelada");
export const crearOrden = async (req, res)=>{
    const order = {
        "intent": "CAPTURE",
        "purchase_units": [ {
            amount: {
                concurrency_code: "USD",
                value: '100.00'
             }
        } ],
        "application_context": {
            brand_name: "Tienda",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: `${ HOST }/api/pagos/capturar-orden`,
            cancel_url: `${ HOST }/api/pagos/cancelar-orden`
         },
    };

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const { data: { access_token } } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
        auth: {
            username: PAYPAL_Client,
            password: PAYPAL_KEY
        }
    });

    const respuesta = await axios.post(`${ PAYPAL_API }/v2/checkout/orders`, order, {
        headers: {
            Authorization: `Bearer ${ access_token }`
        }
    });

    return res.json(respuesta.data);
};

export const capturarOrden = async (req, res)=>{
    const { token } = req.query;
    const respuesta = await axios.post(`${ PAYPAL_API }/v2/checkout/orders/${ token }/capture`, {}, {
        auth: {
            username: PAYPAL_Client,
            password: PAYPAL_KEY
        }
    });

    console.log(respuesta.data);

    return res.send('Pagado');
};

export const cancelarOrden = async (req, res)=>{
    res.redirect('/')
};
