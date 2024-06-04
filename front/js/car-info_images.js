let mainInfoPhoto = document.querySelector('.main-info__photos');
let images = Array.from(mainInfoPhoto.children);

let wrapperBox = [];
let wrapper;
for(let i = 0; i < images.length; i++) {
    if (i % 3 == 0 && i % 6 == 0) {
        wrapper = document.createElement('div');
        images[i].className = 'wrapper-main';
        wrapper.appendChild(images[i]);
    } else if (i % 3 == 1 && i % 4 != 0) {
        if (!wrapper) wrapper = document.createElement('div');
        images[i].className = 'wrapper-helper';
        wrapper.appendChild(images[i]);
    } else if (i % 3 == 2) {
        wrapper = document.createElement('div');
        wrapper.appendChild(images[i]);
    } else if (i % 3 == 0 && i % 6 != 0) {
        wrapper = document.createElement('div');
        if(images.length - 1 == i){
            images[i].classList.add('wrapper-small');
        }else{
            images[i].className = 'wrapper-helper';
        }
        wrapper.appendChild(images[i]);
    } else if (i % 3 == 1 && i % 4 == 0) {
        images[i].className = 'wrapper-main';
        if (!wrapper) wrapper = document.createElement('div');
        if(images.length - 1 == i){
            images[i].classList.add('wrapper-small');
        }
        wrapper.appendChild(images[i]);
    } else {
        wrapper = document.createElement('div');
        wrapper.appendChild(images[i]);
    }
    wrapperBox.push(wrapper);
}

// Очищаем исходный контейнер и добавляем новые div элементы
mainInfoPhoto.innerHTML = '';
for(let i = 0; i < wrapperBox.length; i++) {
    mainInfoPhoto.appendChild(wrapperBox[i]);
}

console.log(wrapperBox);