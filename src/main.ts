import './style.css'

import polyfill from './polyfill'
import canvasSketch from 'canvas-sketch'
import colorMap from 'colormap'
import { random, math } from 'canvas-sketch-util'

polyfill()
// Sketch parameters
const settings = {
	dimensions: [window.innerWidth, window.innerWidth],
	animate: true,
}

/**
 * @typedef SketchFuncProps
 * @type {object}
 * @property {CanvasRenderingContext2D} context - context of canvas.
 * @property {number} width - width of canvas.
 * @property {number} height - height of canvas.
 */
const sketch = ({ context, width, height }: any) => {
	const cols = 50
	const rows = 10
	const total = cols * rows

	const gridWidth = width
	const gridHeight = height
	const cellWidth = gridWidth / cols
	const cellHeight = gridHeight / rows

	const margins = {
		x: (width - gridWidth) / 2,
		y: (height - gridHeight) / 2,
	}

	const amplitude = 90
	const frequency = 0.009

	const colors = colorMap({
		colormap: 'jet',
		nshades: amplitude / 3,
	})

	const points = [] as { x: number; y: number; lineWidth: number; color: string | number[]; noise: number }[]

	for (let i = 0; i < total; i++) {
		const x = (i % cols) * cellWidth
		const y = Math.floor(i / cols) * cellHeight

		const noise = random.noise2D(x, y, frequency, amplitude)
		const lineWidth = math.mapRange(noise, -amplitude, amplitude, 0, 14)

		const colorIndex = Math.floor(math.mapRange(noise, -amplitude, amplitude, 0, amplitude))
		const color = colors[colorIndex]

		points.push({ x: x + noise, y: y + noise, lineWidth, color, noise })
	}

	return (/** @type {SketchFuncProps} */ { frame }: any) => {
		context.fillStyle = 'black'
		context.fillRect(0, 0, width, height)

		context.save()
		context.translate(margins.x, margins.y)
		context.translate(cellWidth / 2, cellHeight / 2)

		const mutatedPoints = points.map((p) => {
			const noise = random.noise2D(p.x, p.x + frame, frequency, amplitude)
			return { ...p, x: p.x + noise, y: p.y + noise }
		})

		for (let r = 0; r < rows; r++) {
			context.beginPath()

			let lastX, lastY

			for (let c = 0; c < cols - 1; c++) {
				const curr = mutatedPoints[r * cols + c + 0]
				const next = mutatedPoints[r * cols + c + 1]

				const mx = curr.x + (next.x - curr.x) * 0.5
				const my = curr.y + (next.y - curr.y) * 0.5

				if (c === 0) {
					lastX = curr.x
					lastY = curr.y
				}

				context.beginPath()
				context.lineWidth = curr.lineWidth
				context.strokeStyle = curr.color
				context.moveTo(lastX ? lastX + 2 : 0, lastY ? lastY + 1 : 0)
				context.quadraticCurveTo(curr.x, curr.y, mx, my)

				context.stroke()
				lastX = mx
				lastY = my
			}
			context.stroke()
		}

		context.restore()
	}
}

requestIdleCallback(() => {
	canvasSketch(sketch, settings)
})
