# Api de Node con PayPal

## Instalación manual de bibliotecas

* yarn add express morgan cors
* yarn add nodemon -D
* yarn add dotenv axios

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

    ```js
        "intent": "CAPTURE"
        "purchase_units": [ ... ]
        "application_context": { ... }
    ```

* Se hace una petición con axios a la dirección del api de PayPal
* axios.post`('https://api-m.paypal.com/v2/checkout/orders')`;
* Pero este es el de producción por lo que usa la variable de entorno para desarrollo
* `${ PAYPAL_API }/v2/checkout/orders`
* Se añade los headers
* Axios ya incluye `"Content-Type": "application/json"` que es requerido en las cabeceras
* Pero antes se envía otra petición asíncrona para registrarse
* Se envían como parámetros de autenticación el nombre de usuario (Client ID) y la contraseña (Secret key) a la dirección `${PAYPAL_API}/v1/oauth2/token`
* Y se obtiene el access token que se enviara en las cabeceras de primera petición
* Se agrega a los headers
* Authorization: `Bearer ${ access_token }`
* Finalmente obtenemos los datos de la respuesta: respuesta.data

## Respuesta y Pruebas

* Dentro de los datos buscamos: links > [{ 0 }, { **1** }] > href
* Este enlace por ejemplo `('https://api.sandbox.paypal.com/checkoutnow?token=79R656090H888815Y')`
* Nos llevara a una ventana de login en sandbox.paypal
* Podemos conectarnos con nuestra cuenta de prueba
* En developer portal > Testing Tools > Sandbox test accounts > Create account
* Seleccionas **Personal (Buyer Account)** y lo creas
* Tomamos los datos de la nueva cuenta e ingresamos al login del enlace
* Realizamos una compra de prueba y vemos el resultado
* Nos retorna una pagina con **captureOrder created**

## Capturar la Orden desde el Backend

* En el enlace de la ultima pagina podemos encontrar un token y lo tomamos
* Al capturar la orden guardamos el token: `const { token } = req.query;`
* Hacemos otra petición a `${ PAYPAL_API }/v2/checkout/orders/${ token }/capture`
* Enviamos el usuario y la contraseña de venv, recibimos los datos de la respuesta y retornamos un `"Pagado"`
* En Crear Orden cambiamos el return para que muestre el enlace dentro de respuesta en el navegador
* `return res.json(respuesta.data);`
* Puedes usar una extension llamada **"JSON Viewer"** para ver mejor los json y también puedes cambiar el tema
* Entras al enlace del elemento del arreglo en el indice **1**
* Ya debería estar registrado el usuario pero de lo contrario has el login
* Realiza un pago ficticio de nuevo y debería decir **pagado**.
* También puedes ingresar a sandbox paypal normal con la cuenta falsa y ver las transacciones realizadas.
* Ademas con los datos podrías guardar el nombre, correo, id de la transacción, id de la cuenta, estado de la transacción (status), etc.

## Cancelar Orden

* se crea una carpeta public con index.html y pagado.html
* En index.js se usa el modulo path de node para enviar la dirección de public

    ```js
        app.use(express.static(path.resolve('src/public')));
    ```
* Cambiar la ruta de crear Orden a POST
    ```js
    router.post('/crear-orden', crearOrden);
    ```
* En index.html crear un botón y un script que haga un fetch a la ruta /crear-orden y obtenga la respuesta con el enlace a paypal a donde te enviara.

    ```js
    const checkout = document.getElementById('checkout');
        checkout.addEventListener('click', async ()=>{
            const respuesta = await fetch('/crear-orden', {
                method: 'POST'
            });
            const datos = await respuesta.json();
            window.location.href = datos.links[1].href;
        })
    ```
* Extra
* En respuesta puedes enviar los productos como un arreglo

```js
    const respuesta = await fetch('/crear-orden', {
                method: 'POST',
                body: JSON.stringify([{id: ..., product: ...}, ...{products}])
            });
```
