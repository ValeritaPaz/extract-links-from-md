exports.extract = function(string) {
  'use strict';
  //  inicio y fin de cada corchete y parentesis
  var reAllLinks = /!?\[(.*)\]\((.*?)\)/g;
  var alllinks = string.match(reAllLinks);
  var alllinksclean = [];
  // console.log(alllinks);
  alllinks.forEach(element => {
    if (!element.startsWith('!')) {
      alllinksclean.push(element);
    }
  });
  // console.log(alllinksclean);
  var reBrac = /\[(.*?)\]/;
  var rePare = /\((.*?)\)/;

  var texts = [];
  var links = [];

  alllinksclean.forEach(element => {
    // console.log(element);
    texts.push(element.match(reBrac)[1]);
    // console.log(element.match(reBrac)[1]);
    links.push(element.match(rePare)[1]);
    // console.log(element.match(rePare)[1]);
  });

  // console.log(texts);
  // console.log(links);
  var objarray = [];
  //  Debemos estar seguros que los array con los textos
  //  y los links sean del mismo tamaño
  for (let i = 0; i < texts.length; i++) {
    let obj = {};
    let link;
    let text;
    link = links[i].replace('(', '');
    link = link.replace(')', '');
    text = texts[i].replace('[', '');
    text = text.replace(']', '');
    obj.href = link;
    obj.text = text;
    objarray.push(obj);
  }
  return objarray;
};
// extractLinks(str);