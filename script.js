const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const bField = document.getElementById('field')
const bPlayer = document.getElementById('player')
const modalEl = document.getElementById('modalEl')
const houseEl = document.getElementById('houseEl')
const farmEl = document.getElementById('farmEl')
const foresterEl = document.getElementById('foresterEl')
const mineEL = document.getElementById('mineEl')

canvas.width = innerWidth
canvas.height = 800

let fields = []
let player
let clicked
let mouse

class Player {
    constructor(fields, food, rock, wood, population, happiness) {
        this.fields = fields
        this.food = food
        this.rock = rock
        this.wood = wood
        this.population = population
        this.happiness = happiness
    }

    toString = function () {
        return "Population: " + this.population + " Happiness: " + this.happiness + " Food: " + this.food + " Wood: " + this.wood + " Rock: " + this.rock
    }

    innerUpdate = function () {
        bPlayer.innerText = player.toString()
    }

    growth = function () {

    }
}

class field {
    constructor(x, y, name, color) {
        this.x = x
        this.y = y
        this.name = name
        this.color = color
    }
}

function randPos() {
    let x = Math.floor(Math.random() * 10)
    let y = Math.floor(Math.random() * 10)
    return {x, y}
}

function init() {
    let x = canvas.width / 3, y = 200
    let rand = randPos()
    player = new Player([], 5, 3, 3, 3, 5)
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (i === rand.x && j === rand.y) {
                player.fields.push([x, y, 'green'])
                fields.push(new field(x, y, 'Town', 'green'))
            } else {
                fields.push(new field(x, y, 'empty', 'gray'))
            }
            y += 50
        }
        y = 200
        x += 50
    }
    bPlayer.innerText = player.toString()
}


function draw() {
    fields.forEach((field) => {
        c.beginPath()
        c.rect(field.x, field.y, 50, 50)
        c.fillStyle = field.color
        c.fill()
        c.stroke()
    })
}

function getField(event) {
    fields.forEach((field) => {
        if (event.type === 'click') {
            if (field.x <= event.clientX && field.x + 50 >= event.clientX) {
                if (field.y + 48 <= event.clientY && field.y + 98 >= event.clientY) {
                    if (field.name === 'empty') {
                        mouse = true
                    }
                }
            }
        } else {
            if (field.x <= event.clientX && field.x + 50 >= event.clientX) {
                if (field.y + 48 <= event.clientY && field.y + 98 >= event.clientY) {
                    bField.innerText = field.name
                }
            }
        }
    })
}

let animationId

function render() {
    animationId = requestAnimationFrame(render)
    draw()
    if (clicked) {
        if (mouse) {
            cancelAnimationFrame(animationId)
            modalEl.style.display = 'flex'
        }
    }
}

addEventListener('mousemove', (event) => {
    getField(event)
})

addEventListener('click', (event) => {
    if (clicked) {
        clicked = false
        modalEl.style.display = 'none'
        render()
    } else {
        getField(event)
        console.log(mouse)
        clicked = true
    }
})

farmEl.addEventListener('click', () => {
})

houseEl.addEventListener('click', () => {
})

foresterEl.addEventListener('click', () => {
})

mineEL.addEventListener('click', () => {
})


init()
render()


