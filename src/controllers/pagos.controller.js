import { HOST, PAYPAL_API, PAYPAL_Client, PAYPAL_KEY } from "../config.js";
import axios from "axios";

// export const crearOrden = (req, res)=>res.send("Orden Cancelada");
export const crearOrden = async (req, res)=>{
    const orden = {
        "intent": "CAPTURE",
        "purchase_units": [ {
            amount: {
                currency_code: 'USD',
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
    })

    const respuesta = await axios.post(`${ PAYPAL_API }/v2/checkout/orders`, orden, {
        headers: {
            Authorization: `Bearer ${ access_token }`
        }
    });

    console.log(respuesta.data)

    return res.json('capture order')

};

export const capturarOrden = (req, res)=>res.send("Orden Capturada");

export const cancelarOrden = (req, res)=>res.send("Orden Cancelada");
