
#List de tipos de MIME
```js
    Application
        application/json
        application/xml

    Audio
        audio/mpeg
        audio/x-ms-wma

    Imagen
        image/gif
        image/jpeg
        image/png
        image/x-icon

    Video
        video/mpeg
        video/mp4
        video/webm
    
```

#FormData
Cuando hacemos uso del metodo post, debemos hacer uso de una formulario en el cual contiene todos los datos que vamos a subir. Para que los datos se guarden de forma correcta debemos añadir el atributo de name a las etiqueas que van a contener los datos que nosotros necesitamos, es decir, le vamos añadir el atributo de name a las etiquetas de file o text area, ya que estas son la etiquetas que normalmente contiene información que es agregada por el usuario

```html
    <input type ='text' name ='name'>
    <input type ='text' name ='lastname'>
```
Estos datos van a ser obtenidas y cargados por una instancia del prototype de FormData. 

```js
    const form = document.getElementById('formElementId')
    const formData = new FormData(form)
```
Finalmente cuando vayamos a crear la petición POST, nosotros podemos hacer uso de esta instancia para mandersela direnctamente sobre el body, no hay necesidad de convertirlo a json.

```js
    fetch(URL, { body: formData })
```

