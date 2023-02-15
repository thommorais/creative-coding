import './style.css'

import canvasSketch from 'canvas-sketch'

// Sketch parameters
const settings = {
	dimensions: [800, 800],
	animate: true,
}

// Artwork function
const sketch = ({ context, width, height }: any) => {
	let x = 0
	let y = 0

	context.fillStyle = 'white'
	context.fillRect(0, 0, width, height)

	return ({ frame }: any) => {
		if (frame > 138) {
			return
		}

		x += 10

		if (x > 460) {
			y += 240
			x = 0
		}

		context.fillStyle = frame % 2 ? 'black' : 'white'
		context.strokeStyle = context.fillStyle

		// Set line width
		context.lineWidth = 10

		// Wall
		context.strokeRect(x + 75, y + 140, 150, 110)

		// Door
		context.fillRect(x + 130, y + 190, 40, 60)

		// Roof
		context.beginPath()
		context.moveTo(x + 50, y + 140)
		context.lineTo(x + 150, y + 60)
		context.lineTo(x + 250, y + 140)
		context.closePath()
		context.stroke()
	}
}

requestIdleCallback(() => {
	canvasSketch(sketch, settings)
})
