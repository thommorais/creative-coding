import './style.css'

import polyfill from './polyfill'
import canvasSketch from 'canvas-sketch'
import colorMap from 'colormap'
import { random, math } from 'canvas-sketch-util'

polyfill()
// Sketch parameters
const settings = {
	dimensions: [1080, 1080],
}

/**
 * @typedef SketchFuncProps
 * @type {object}
 * @property {CanvasRenderingContext2D} context - context of canvas.
 * @property {number} width - width of canvas.
 * @property {number} height - height of canvas.
 */
const sketch = ({ context, width, height }: any) => {
	const cols = 72
	const rows = 8
	const total = cols * rows

	const gridWidth = width * 0.8
	const gridHeight = height * 0.8

	const cellWidth = gridWidth / cols
	const cellHeight = gridHeight / rows

	const margins = {
		x: (width - gridWidth) / 2,
		y: (height - gridHeight) / 2,
	}

	const amplitude = 90
	const frequency = 0.002

	const colors = colorMap({
		colormap: 'salinity',
		nshades: amplitude,
	})

	const points = [] as { x: number; y: number; lineWidth: number; color: string | number[] }[]

	for (let i = 0; i < total; i++) {
		const x = (i % cols) * cellWidth
		const y = Math.floor(i / cols) * cellHeight

		const noise = random.noise2D(x, y, frequency, amplitude)
		const lineWidth = math.mapRange(noise, -amplitude, amplitude, 0, 5)

		const colorIndex = Math.floor(math.mapRange(noise, -amplitude, amplitude, 0, amplitude))
		const color = colors[colorIndex]

		points.push({ x: x + noise, y: y + noise, lineWidth, color })
	}

	return (/** @type {SketchFuncProps} */ {}: any) => {
		context.fillStyle = 'black'
		context.fillRect(0, 0, width, height)

		context.save()
		context.translate(margins.x, margins.y)
		context.translate(cellWidth / 2, cellHeight / 2)

		// draw lines
		context.strokeStyle = 'red'
		context.lineWidth = 4

		for (let r = 0; r < rows; r++) {
			context.beginPath()

			let lastX, lastY

			for (let c = 0; c < cols - 1; c++) {
				const curr = points[r * cols + c + 0]
				const next = points[r * cols + c + 1]

				const mx = curr.x + (next.x - curr.x) * 0.8
				const my = curr.y + (next.y - curr.y) * 5.5

				if (c === 0) {
					lastX = curr.x
					lastY = curr.y
				}

				context.beginPath()
				context.lineWidth = curr.lineWidth
				context.strokeStyle = curr.color
				context.moveTo(lastX, lastY)
				context.quadraticCurveTo(curr.x, curr.y, mx, my)

				context.stroke()
				lastX = mx - (c / cols) * 250
				lastY = my - (r / rows) * 250
			}
			context.stroke()
		}

		context.restore()
	}
}

requestIdleCallback(() => {
	canvasSketch(sketch, settings)
})
