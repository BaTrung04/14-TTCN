var content = document.querySelector('.content')
var input = document.querySelector('.content input')
var btnRemoveAll = document.querySelector('.remove-all ')

var tags = ['Nodejs', 'Reactjs']

function render () {
    content.innerHTML = ''
    for(let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        content.innerHTML += `
                <li>
                    ${tag}
                <i class="fa-solid fa-xmark" onclick="removeTag(${i})"></i>
                </li>`
    }
    content.appendChild(input)
    // Hàm dùng để bổ sung một DOM Node vào vị trí cuối cùng của một DOM Node khác.
    input.focus();
}

function removeTag (index) {
    tags.splice(index, 1)
    render()
}

render();

input.addEventListener('keydown', function (e) {
    if (e.key == 'Enter'&& checkRepeat()) {
        tags.push(input.value.trim())
        input.value = ''
        render()
    }
})

btnRemoveAll.addEventListener('click', function () {
    tags = []
    render()
})

function checkRepeat () {
    var check = true;
    tags.forEach (function (tag) {
        if (tag == input.value.trim()) {
            check = false;
        }
    })
    return check;
}