const btn_close = document.querySelector('.close');
const btn_prev = document.querySelector('.prev');
const btn_next = document.querySelector('.next');
const images = document.querySelectorAll('.img img');
const galleryImage = document.querySelector('.gallery-inner img');
const gallery = document.querySelector('.gallery');

let currentIndex = 0;

images.forEach(function (image, index) {
    image.onclick = function () {
        currentIndex = index;
        imageShow();
    }
})

// Hàm show ảnh 
function imageShow () {
    console.log(currentIndex)
    //Prev ảnh
    currentIndex == 0
        ? btn_prev.classList.add('hide')
        :btn_prev.classList.remove('hide');

    currentIndex == images.length - 1
        ? btn_next.classList.add('hide')
        : btn_next.classList.remove('hide');

    galleryImage.src = images[currentIndex].src;
    gallery.classList.add('show');
}

btn_close.addEventListener('click', function () {
    gallery.classList.remove('show');
})

document.addEventListener('keydown', function (e) {
    if(e.keyCode == 27) {
        gallery.classList.remove('show');
    }
})

btn_prev.addEventListener('click', function () {
    if (currentIndex > 0) {
        currentIndex--;
        imageShow();
    }
})

btn_next.addEventListener('click', function () {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        imageShow();
    }
})