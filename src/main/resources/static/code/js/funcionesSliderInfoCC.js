const slider_content = document.querySelectorAll('.slider_content')
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
let index = 0

const mount = () => slider_content[index].classList.add('active')
const unmount = () => slider_content[index].classList.remove('active')
next.addEventListener('click', () => {
    unmount()
    if(index >= slider_content.length - 1){
        index = 0
    }
    else {

        index++
    }
    mount()
})

prev.addEventListener('click', () => {
    unmount()
    if(index <= 0){
        index = slider_content.length - 1
    }
    else {
        index--
    }
    mount()
})

mount()