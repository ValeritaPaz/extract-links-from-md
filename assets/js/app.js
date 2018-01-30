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
        var longitud;
        longitud = (JSON.parse(boxResponse.textContent)).length;
        console.log(longitud);
        var responseCounter = document.querySelector('.responseCounter');
        responseCounter.innerHTML = '';
        if (longitud != 8) {
            responseCounter.appendChild(document.createTextNode(longitud));
        } else if (longitud == 8) {
            responseCounter.appendChild(document.createTextNode(0));
        }


    };
    xhr.setRequestHeader('Content-Type', 'charset=UTF-8');
    xhr.send(text);
    console.log(xhr.status);
});