# Api de Node con PayPal

## Instalación manual de bibliotecas

* yarn add express morgan cors
* yarn add nodemon -D
* yarn add dotenv
* yarn add axios

## Crea un Proyecto Básico de Node (Estructura)

    index.js
    routes
    controllers
    config.js

## Ir a la pagina [PayPal Developer](https://developer.paypal.com)

* Crea una cuenta confirmada/aprobada
* Ve a **Log in Dashboard** y utiliza tu cuenta de PayPal personal
* Apps & Credentials > API Credentials > Create App
* Esto abre un formulario Create App
* App Name (REST API Productos), Type: Merchant, Sandbox Account: Correo (o email de dominio)
* Se envía el formulario
* Ahora aparecerán el nombre, el "Client ID" y la "Secret key 1"

## Configuración de PayPal API

* Se guardan "Client ID" y "Secret key 1" en config.js
* Pero solo a traves de variables de entorno (venv)

## Crear Orden

* Puedes ir a PayPal developers en Orders > [Create order](https://developer.paypal.com/docs/api/orders/v2/)
* y ver el método POST con la ruta para enviar la petición
* también hay un ejemplo de un json con los datos que se pueden enviar.
* Los mas importantes son:
    "intent": "CAPTURE"
    "purchase_units": [ ... ]
    "application_context": { ... }
* Se hace una petición con axios a la dirección del api de PayPal
* axios.post('https://api-m.paypal.com/v2/checkout/orders');
* Pero este es el de producción por lo que usa la variable de entorno para desarrollo
* `${ PAYPAL_API }/v2/checkout/orders`
* Se añade los headers
* Axios ya incluye "Content-Type": "application/json" que es requerido en la cabecera
* Pero antes se envía otra petición asíncrona para registrarse
* Se envían como parámetros de autenticación el nombre de usuario (Client ID) y la contraseña (Secret key) a la dirección `${PAYPAL_API}/v1/oauth2/token`
*
