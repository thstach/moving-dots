var dots1 = []
var dots2 = []
var dots3 = []
var idCounter = 0
var timer = 0
var chaos = false

var leftbox = document.getElementById('leftbox')
var ctxLeftbox = leftbox.getContext('2d');
var leftboxWidth = leftbox.width
var leftboxHeight = leftbox.height

const box = {
	leftbox: document.getElementById('leftbox'),
	staging: document.getElementById('staging'),
	rightbox: document.getElementById('rightbox')
}

const ctx = {
	leftbox: box['leftbox'].getContext('2d'),
	staging: box['staging'].getContext('2d'),
	rightbox: box['rightbox'].getContext('2d')
}

const boxWidths = {
	leftbox: box['leftbox'].width,
	staging: box['staging'].width,
	rightbox: box['rightbox'].width
}

const boxHeights = {
	leftbox: box['leftbox'].height,
	staging: box['staging'].height,
	rightbox: box['rightbox'].height
}

setInterval(function () {
	moveDots()
	timer += 1
	// console.log(Math.round(Math.random() * 2 - 1))
}, 2)

function moveDots() {
	dots1.forEach(dot => dot.move())
	dots2.forEach(dot => dot.move())
	dots3.forEach(dot => dot.move())
	draw()
}

function drawLeftbox() {
	ctx['leftbox'].clearRect(0, 0, boxWidths['leftbox'], boxHeights['leftbox']);
	dots1.forEach(dot => dot.draw())
}

function drawStaging() {
	ctx['staging'].clearRect(0, 0, boxWidths['staging'], boxHeights['staging']);
	dots2.forEach(dot => dot.draw())
}

function drawRightbox() {
	ctx['rightbox'].clearRect(0, 0, boxWidths['rightbox'], boxHeights['rightbox']);
	dots3.forEach(dot => dot.draw())
}

function switchBox(dot) {
	let i = 0
	if (dot.box === 'leftbox') {
		for (i = 0; i <= dots1.length - 1; i++) {
			if (dots1[i].id === dot.id) {
				break
			}
		}
		const _dot = dots1.splice(i, 1)[0]
		_dot.x = -_dot.radius
		_dot.box = 'staging'
		_dot.color = 'orange'
		dots2.push(_dot)
	}

	if (dot.box === 'staging' && dot.x > 0) {
		for (i = 0; i <= dots2.length - 1; i++) {
			if (dots2[i].id === dot.id) {
				break
			}
		}
		const _dot = dots2.splice(i, 1)[0]
		_dot.x = -_dot.radius
		_dot.box = 'rightbox'
		_dot.color = 'purple'
		dots3.push(_dot)
	}

	if (dot.box === 'rightbox' && dot.x > 0) {
		for (i = 0; i <= dots3.length - 1; i++) {
			if (dots3[i].id === dot.id) {
				break
			}
		}
		const _dot = dots3.splice(i, 1)[0]
		_dot.x = -_dot.radius
		_dot.box = 'leftbox'
		_dot.color = 'teal'
		dots1.push(_dot)
	}
}

document.getElementById('add').addEventListener('click', () => {
	var dot = {
		id: idCounter,
		box: 'leftbox',
		x: Math.round(Math.random() * 20) * 10 + 5,
		y: Math.round(Math.random() * 20) * 10 + 5,
		vx: 1,
		radius: Math.round(Math.random() * 7) + 2,
		color: 'teal',
		draw: function () {
			ctx[this.box].beginPath()
			ctx[this.box].arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
			ctx[this.box].stroke()
			ctx[this.box].fillStyle = this.color
			ctx[this.box].fill()
		},
		move: function () {
			this.x += this.vx
			if (chaos) {
				this.y += Math.round(Math.random() * 2 - 1)
			}
			if (this.x - this.radius >= boxWidths[this.box]) {
				switchBox(this)
			}
		}
	}
	dots1.push(dot)
	idCounter++
	dot.draw()
})


document.getElementById('remove').addEventListener('click', () => {
	if (dots1.length > 0) {
		const i = Math.floor(Math.random() * dots1.length)
		dots1.splice(i, 1)
	}
	draw()
})

document.getElementById('chaos').addEventListener('click', (event) => {
	chaos = event.target.checked
})

function draw() {
	drawLeftbox()
	drawStaging()
	drawRightbox()
}