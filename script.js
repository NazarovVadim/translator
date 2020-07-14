'use strict';

const labels = document.querySelectorAll('.language'),
    swipeBtn = document.querySelector('.swipe'),
    translateBtn = document.querySelector('.translate'),
    textareas = document.querySelectorAll('#textarea'),
    API_KEY = 'trnsl.1.1.20190225T091515Z.06bde7bd52a8c1a7.0749f827a8a0474bf52a18b3b47f827f339c781a',
    form = document.querySelector('.form');

const postData = (url) => {
    return fetch(url,{ method:  'POST', mode: 'cors'});
};

const translate = () => {
    const lang = (labels[0].textContent.toLowerCase() === 'english') ? 'en-ru' : 'ru-en';
    const text = textareas[0].value;
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${lang}&text=${text}&key=${API_KEY}`;
    postData(url)
        .then((response) => {
            if(response.status !== 200) throw new Error('status network not 200');
            return response.json();
        })
        .then((response) => {
            textareas[1].value = response.text;
        })
        .catch(error => {console.error(error);
    });
}

translateBtn.addEventListener('click', () => {
    if(textareas[0].value.trim() !== ''){
        translate();
    }
    
});
swipeBtn.addEventListener('click', () => {
    const intermediateValue = labels[0].innerHTML;
    console.log(labels[1].innerHTML);
    labels[0].innerHTML = labels[1].innerHTML;
    labels[1].innerHTML = intermediateValue;
    if(textareas[0].value.trim() !== ''){
        textareas[0].value = textareas[1].value;
        translate();
    }

});