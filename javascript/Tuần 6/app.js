var btnSuccess = document.querySelector('.control .success')
var btnWarning = document.querySelector('.control .warning')
var btnError = document.querySelector('.control .error')

btnSuccess.addEventListener('click', function () {
    createToast('success')
})

btnWarning.addEventListener('click', function () {
    createToast('warning')
})

btnError.addEventListener('click', function () {
    createToast('error')
})

function createToast (status) {
    let templateInner = `<i class="fa-solid fa-check"></i>
                        <span class="Message">This is a success message</span>`
    switch (status) {
        case 'success':
            templateInner = `<i class="fa-solid fa-check"></i>
            <span class="Message">This is a success message</span>`
            break;
        case 'error':
            templateInner = `<i class="fa-solid fa-circle-exclamation"></i>
            <span class="Message">This is a error message</span>`
            break;
        case 'warning':
            templateInner = `<i class="fa-solid fa-triangle-exclamation"></i> 
            <span class="Message">This is a warning message</span>`
            break;
    }

    var toast = document.createElement('div')
    toast.classList.add('toast')
    toast.classList.add(status)
    toast.innerHTML = ` ${templateInner}
                        <span class="countdown"></span>`

    var toastList = document.getElementById('toasts')
    toastList.appendChild(toast)

    var timeout = timeout || 4000
    setTimeout (function () {
        toast.style.animation = 'slide_hide 2s ease forwards'
    }, 4000)
    setTimeout (function () {
        toast.remove()
    }, 6000)
}