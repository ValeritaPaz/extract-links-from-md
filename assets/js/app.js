var buttonSearch = document.querySelector('#button');

var textArea = document.querySelector('#textarea1');
var boxResponse = document.querySelector('#boxResponse');

buttonSearch.addEventListener('click', function () {
    var text = textArea.value;
    var xhr = new XMLHttpRequest();
    var url = 'http://127.0.0.1:8080/Extract';
    xhr.open('POST', url, true);
    xhr.responseType = 'text';
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            boxResponse.textContent = xhr.responseText;





            //console.log(boxResponse.textContent);
        }
        var textParse;
        textParse = (JSON.parse(boxResponse.textContent));
        console.log(textParse);
        var responseCounter = document.querySelector('.responseCounter');
        responseCounter.innerHTML = '';
        if (Array.isArray(textParse)) {
            responseCounter.appendChild(document.createTextNode(textParse.length));
        } else {
            responseCounter.appendChild(document.createTextNode(0));        }


    };
    xhr.setRequestHeader('Content-Type', 'charset=UTF-8');
    xhr.send(text);
    console.log(xhr.status);
});