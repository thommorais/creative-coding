import './style.css'

import canvasSketch from 'canvas-sketch'
import { math } from 'canvas-sketch-util'

// Sketch parameters
const settings = {
	dimensions: [1080, 1080],
	animate: true,
}

// Artwork function
const sketch = ({ context, width, height }: any) => {
	let x, y, w, h
	return ({}: any) => {
		context.fillStyle = 'white'
		context.fillRect(0, 0, width, height)

		x = width * 0.5
		y = height * 0.5
		w = width * 0.6
		h = height * 0.1

		context.save()
		context.translate(x, y)
		context.strokeStyle = 'blue'

		drawSkewedRect({ context, width: w, height: h, degrees: 30 })
		context.stroke()

		context.restore()
	}
}

const drawSkewedRect = ({ context, width = 600, height = 200, degrees = -45 }: any) => {
	const angle = math.degToRad(degrees)

	const rx = Math.cos(angle) * width
	const ry = Math.sin(angle) * width

	context.save()
	context.translate(rx * -0.5, (ry + height) * -0.5)

	context.strokeStyle = 'blue'

	context.beginPath()
	context.moveTo(0, 0)
	context.lineTo(rx, ry)
	context.lineTo(rx, ry + height)
	context.lineTo(0, height)
	context.closePath()
	context.stroke()

	context.restore()
}

requestIdleCallback(() => {
	canvasSketch(sketch, settings)
})
