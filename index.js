let extractLinks = require('./lib/extract_links');
let http = require('http');
let fs = require('fs');
let path = require('path');

// Crear Servidor Web
http.createServer((request, response) =>{
  // console.log('request ', request.url);
  let filePath = '.' + request.url;
  if (filePath == './') {
    filePath = './index.html';
  }

  let extname = String(path.extname(filePath)).toLowerCase();
  let contentType = 'text/html';
  let mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml',
  };

  contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, function(error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile('./404.html', function(error, content) {
          response.writeHead(200, {
            'Content-Type': contentType,
          });
          response.end(content, 'utf-8');
        });
      } else {
        response.writeHead(500);
        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
        response.end();
      }
    } else {
      response.writeHead(200, {
        'Content-Type': contentType,
      });
      response.end(content, 'utf-8');
    }
  });
  // console.log(request.url);
  // Capturando el request del index
  if (request.method == 'POST' && request.url == '/Extract') {
    let body = '';
    let links;

    request.on('data', (text) => {
      body += text;
      // console.log(links);
      // response.write(toString(links));
      // response.end(toString(links));
    });
    request.on('end', () => {
      // console.log(body);
      // console.log(response.body);
      response.end(
        JSON.stringify(extractLinks.extract(body), 'undefined', 2), 'utf8');
    });
  }
}).listen(8080);
console.log('Servidor Corriendo En http://127.0.0.1:8080/');

let str = `# Lyft

* **Track:** _Common Core_
* **Curso:** _Creando tu primer sitio web interactivo_
* **Unidad:** _Maquetado web con HTML & CSS_

***

Para completar este reto, hemos creado este repositorio boilerplate (plantilla
inicial) con todos los recursos que necesitas. Esto incluye imágenes y
estructura de carpetas y archivos donde colocarás tu código.

## Flujo de trabajo

1. Debes realizar un [**fork**](https://gist.github.com/ivandevp/1de47ae69a5e139a6622d78c882e1f74)
   de este repositorio.

2. Luego deberás **clonar** tu fork en tu máquina. Recuerda que el comando 
a usar
   es \`git clone\` y su estructura normalmente se ve así:

   \`\`\`bash
   git clone https://github.com/<nombre-de-usuario>/lyft.git
   \`\`\`

## Objetivo

El reto consiste en replicar el sitio de **Lyft**, este será el resultado
a lograr:

![Lyft Website](docs/fullpage.png)

## Consideraciones

* Encontrarás un archivo base \`index.html\` en el cual deberás escribir la
  estructura de tu proyecto y enlazar tus archivos de estilos (CSS).

* En la carpeta \`css\` tendrás un archivo base \`main.css\` donde agregarás los
  estilos necesarios para tu proyecto:

* Dentro de la carpeta \`assets\` se encuentra la carpeta \`images\` donde
  encontrarás todas las imágenes necesarias para completar tu proyecto.

* Deberás **actualizar el archivo \`README.md\`** explicando el contenido de tu
  repositorio.

* Esta web utiliza la tipografía \`Montserrat\`.

* La paleta de colores puedes obtenerla inspeccionado el sitio original, pero
  para ganar tiempo, puedes usar los siguientes:

  - Botones, hover: \`#FF00BF\`
  - Fondo de \`footer\`: \`#333447\`
  - Título del formulario: \`#352384\`
  - Texto del formulario: \`#728099\`
  - Gradiente morado: \`linear-gradient(#76278F, #2B1E66);\`

* Para el footer, deberás tomar en cuenta que tiene un hover y se ve como en la
  siguiente imagen:

  ![Lyft - Footer](docs/footer.gif)

  Además, los íconos deberás obtenerlo de \`Icomoon\`.

* Para este reto, encontrarás ciertas cosas que probablemente aun no has visto
  en clase (formularios, videos de Youtube). No te preocupes, estamos seguros
  que los afrontarás con éxito, de igual forma aquí unos tips:

  - Estos son los videos de Youtube:
    * https://www.youtube.com/watch?v=fLSmUWOYpKw
    * https://www.youtube.com/watch?v=V7j8Aqxmbs8
    * https://www.youtube.com/watch?v=xj2VWLV0xCU
  - Para agregar los videos, averigua sobre la etiqueta \`iframe\`.
  - Para el formulario, revisa las etiquetas como form e \`input\`.

* Puedes ver el [sitio original](https://www.lyft.com/), sin embargo, su diseño
  ya ha cambiado en ciertas partes, así que tu fuente de verdad es la imagen que
  muestra el objetivo de este reto.

  > Nota: El sitio original tiene ciertos efectos y funcionalidades que
están fuera del alcance de este reto. Enfócate en obtener la maquetación
lo más parecido posible, usando lo aprendido en clase ;)

## A tener en cuenta

Este reto será evaluado sobre lo siguiente:

* Pixel perfect (replicar el diseño con exactitud)
* Estructura de carpetas y archivos
* Nombramiento de clases, id, etc
* Indentación
* Archivo README.md actualizado y correctamente redactado
* Uso de comentarios para hacer tu código más legible`;

let resultado = extractLinks.extract(str);
console.log(resultado);
