exports.extract = function(string) {
  'use strict';
  //  inicio y fin de cada corchete y parentesis
  var reBrac = /\[(.*?)\]/g;
  var rePare = /\((.*?)\)/g;
  var texts = (string.match(reBrac));
  var links = (string.match(rePare));
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