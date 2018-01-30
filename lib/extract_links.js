// let/const

// Permite optar por una versión restringida de JavaScript.
/* reAllLinks es la variable que almacena el patrón que se desea buscar en la
cadena de caracteres*/

/* un modulo, es un código que “exporta/expone” una serie de funciones 
mediante un objeto llamado “exports”
https://palomadeveloper.wordpress.com/2014/11/08/modulos-module-exports-de-javascript-para-autodidactas/. */

/* La declaración export es usada para exportar funciones, 
objetos o tipos de dato primitivos a partir de un archivo (o módulo). 

Al declarar la función de esta manera, permite que la misma sea usada de manera 'pública'*/

// extract es el nombre de la función que extrae los links de un archivo en formato markdown
var extract = string => {
  if (hasLinks(string)) {
    var reAllLinks = /!?\[(.*)\]\((.*?)\)/g;
    // alllinks almacena todos los caracteres que cumplen con el patrón reAllLinks
    // match: Busca dentro de un string lo que sea igual, en este caso al patrón
    var alllinks = string.match(reAllLinks);
    var alllinksclean = removeExPoints(alllinks);
    //console.log(alllinksclean);
    /*  alllinksclean es un  array vacio, que almacenará todos los 
    links que no tengan signo de admiración antes del corchete
    */
  } else {
    return 'No Links';
    // No hay enlaces presentes en el String
  };
  //console.log(extractBracketsParentheses(alllinksclean));
  var textandlinks = extractBracketsParentheses(alllinksclean);

  // Se declara un arreglo vacio objarray donde se colocaran los links y los textos.
  var objarray = [];
  if (sameSize(textandlinks['links'], textandlinks['texts'])) {
    let links = textandlinks['links'];
    let texts = textandlinks['texts'];
    for (let i = 0; i < texts.length; i++) {
      let obj = {};
      obj.href = links[i];
      obj.text = texts[i];
      objarray.push(obj);
    }
    return objarray;
  } else {
    return undefined;
  }
};
// extractLinks(str);

var hasLinks = string => {
  var reAllLinks = /!?\[(.*)\]\((.*?)\)/g;
  return reAllLinks.test(string);
};

var removeExPoints = array => {
  var alllinksclean = [];
  /* Recorrer todo el arreglo y busca cada elemento del arreglo que no tengan "!" y se
  almacenan con push en alllinksclean 
  */
  array.forEach(element => {
    if (!element.startsWith('!')) {
      alllinksclean.push(element);
    }
  });
  return alllinksclean;
};

var extractBracketsParentheses = array => {
  // Se hace un patrón llamado reBrac de expresión regular que contenga brackets (corchetes),
  var reBrac = /\[(.*)\]/;
  // Se hace un patrón llamado rePare de expresión regular que contenga parentheses (parentesis),
  var rePare = /\((.*?)\)/;
  // Se inicializan dos arreglos vacios, uno que almacenará los textos (texts) y otro los links. 
  var texts = [];
  var links = [];
  // Se recorre el arreglo limpio con un forEach.
  array.forEach(element => {
    /* En el arreglo texts se agregan con push todos 
     los elementos que cumplan con el patrón, 
    pero como solo queremos el contenido, 
    se coloca lo que aparece en posición 1 */

    let link = element.match(rePare)[1];
    let text = element.match(reBrac)[1];
    let rehttp = /^http/;
    let retext = /^!.*/;
    if (!rehttp.test(link) || retext.test(text)) {
      /* Si el enlace no comienza por http o el texto comienza por !
      saltamos al siguiente elemento de iteracion dle forEach*/
      return;
    }
    links.push(link);
    texts.push(text);
  });
  // Retornamos un objeto que contiene los links y los textos
  return {'links': links, 
    'texts': texts
  };
};

var sameSize = (array1, array2) => {
  if (array1.length === array2.length) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  extract,
  hasLinks,
  removeExPoints,
  extractBracketsParentheses,
  sameSize
};