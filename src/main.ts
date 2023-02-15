import './style.css'

import canvasSketch from 'canvas-sketch'

import { math, random, color } from 'canvas-sketch-util'
import colors from 'riso-colors'

// Sketch parameters
const settings = {
	dimensions: [1080, 1080],
}

function generateValues(qnt: number, width: number, height: number) {
	const values = [] as {
		x: number
		y: number
		w: number
		h: number
		stroke: string
		fill: string
		blend: string
		colors: string[]
	}[]

	const colorsArr = [random.pick(colors).hex, random.pick(colors).hex, random.pick(colors).hex]

	for (let i = 0; i < qnt; i++) {
		const x = random.range(0, width)
		const y = random.range(0, height)
		const w = random.range(200, 600)
		const h = random.range(40, 200)
		const fill = random.pick(colorsArr)
		const stroke = random.pick(colorsArr)
		const blend = random.value() > 0.5 ? 'overlay' : 'source-over'

		values.push({ x, y, w, h, fill, stroke, blend, colors: colorsArr })
	}
	return values
}

/**
 * @typedef SketchFuncProps
 * @type {object}
 * @property {CanvasRenderingContext2D} context - context of canvas.
 * @property {number} width - width of canvas.
 * @property {number} height - height of canvas.
 */
const sketch = ({ context, width, height }: any) => {
	const values = generateValues(40, width, height)
	const bgColor = random.pick(colors).hex

	const mask = {
		radius: width * 0.4,
		sides: 3,
		y: height * 0.58,
		x: width * 0.5,
	}

	return (/** @type {SketchFuncProps} */ {}: any) => {
		context.fillStyle = bgColor
		context.fillRect(0, 0, width, height)

		context.save()
		context.translate(mask.x, mask.y)
		drawPoligon({ context, radius: mask.radius, sides: mask.sides })
		context.clip()

		values.forEach(({ x, y, w, h, stroke, fill, blend }) => {
			context.save()
			context.translate(x, y)
			context.translate(-mask.x, -mask.y)
			context.strokeStyle = stroke
			context.fillStyle = fill
			context.lineWidth = 10

			context.globalCompositeOperation = blend

			drawSkewedRect({ context, width: w, height: h, degrees: 30 })
			const shadowColor = color.offsetHSL(fill, 0, 0, -20)
			shadowColor.rgba[3] = 0.5
			context.shadowColor = color.style(shadowColor.rgba)
			context.shadowOffsetX = -10
			context.shadowOffsetY = -10
			context.fill()
			context.shadowColor = null
			context.stroke()

			context.globalCompositeOperation = 'source-over'
			context.lineWidth = 2
			context.strokeStyle = 'black'
			context.stroke()

			context.restore()
		})

		context.restore()

		context.save()
		context.translate(mask.x, mask.y)

		context.globalCompositeOperation = 'color-burn'
		context.lineWidth = 20
		context.strokeStyle = values[Math.floor(random.range(1, 39))].colors[0]
		drawPoligon({ context, radius: mask.radius - context.lineWidth, sides: mask.sides })
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

const drawPoligon = ({ context, radius = 100, sides = 3 }: { context: any; radius: number; sides: number }) => {
	const slice = (Math.PI * 2) / sides
	context.beginPath()
	context.moveTo(0, -radius)
	for (let i = 1; i < sides; i++) {
		const theta = i * slice - Math.PI * 0.5
		context.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius)
	}
	context.closePath()
}

requestIdleCallback(() => {
	canvasSketch(sketch, settings)
})
