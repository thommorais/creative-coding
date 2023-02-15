import './style.css'

import canvasSketch from 'canvas-sketch'
import { math, random } from 'canvas-sketch-util'

// Sketch parameters
const settings = {
	dimensions: [1080, 1080],
	animate: true,
}

function generateValues(qnt: number, width: number, height: number) {
	const values = [] as { x: number; y: number; w: number; h: number }[]

	for (let i = 0; i < qnt; i++) {
		const x = random.range(0, width)
		const y = random.range(0, height)
		const w = random.range(200, 600)
		const h = random.range(40, 200)
		values.push({ x, y, w, h })
	}
	return values
}

// Artwork function
const sketch = ({ context, width, height }: any) => {
	const values = generateValues(20, width, height)
	return ({}: any) => {
		context.fillStyle = 'white'
		context.fillRect(0, 0, width, height)

		values.forEach(({ x, y, w, h }) => {
			context.save()
			context.strokeStyle = 'blue'
			context.translate(x, y)

			drawSkewedRect({ context, width: w, height: h, degrees: 30 })
			context.stroke()
			context.restore()
		})
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
