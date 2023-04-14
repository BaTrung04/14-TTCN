document.querySelector('.btn_search').addEventListener('click', function () {
	this.parentElement.classList.toggle('open')
	this.previousElementSibling.focus() 
    // Tự động focus vào thẻ input
})
