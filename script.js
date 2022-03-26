const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
let mouse

canvas.width = innerWidth
canvas.height = innerHeight

const fields = []

class field {
    constructor(x, y, name) {
        this.x = x
        this.y = y
        this.name = name
    }
}

function init() {
    let x = 500, y = 200
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            fields.push(new field(x, y, 'empty' + x + ':' + y))
            y += 50
        }
        y = 200
        x += 50
    }
}


function draw() {
    fields.forEach((field) => {
        c.beginPath()
        c.rect(field.x, field.y, 50, 50)
        c.fillStyle = 'gray'
        c.fill()
        c.stroke()
    })
}

function getField(event) {
    fields.forEach((field) => {
        if (field.x <= event.clientX && field.x + 50 >= event.clientX) {
            if (field.y <= event.clientY && field.y + 50 >= event.clientY) {
                console.log(field.name)
            }
        }
    })
}

function render() {
    requestAnimationFrame(render)
    draw()
}

addEventListener('mousemove', (event) => {
    getField(event)
})


init()
render()


