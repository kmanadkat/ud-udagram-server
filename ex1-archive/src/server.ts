import express, { Router, Request, Response } from 'express'
const bodyParser = require('body-parser')

import { Car, cars as cars_list } from './cars'
;(async () => {
	let cars: Car[] = cars_list

	const app = express()
	const port = 8082

	app.use(bodyParser.json())
	app.use(express.urlencoded({ extended: true }))

	// Root URI call
	app.get('/', (req: Request, res: Response) => {
		res.status(200).send('Welcome to the Cloud!')
	})

	// Get a greeting to a specific person
	// to demonstrate routing parameters
	// > try it {{host}}/persons/:the_name
	app.get('/persons/:name', (req: Request, res: Response) => {
		let { name } = req.params
		if (!name) {
			return res.status(400).send(`name is required`)
		}
		return res.status(200).send(`Welcome to the Cloud, ${name}!`)
	})

	// Get a greeting to a specific person to demonstrate req.query
	// > try it {{host}}/persons?name=the_name
	app.get('/persons/', (req: Request, res: Response) => {
		let { name } = req.query
		if (!name) {
			return res.status(400).send(`name is required`)
		}
		return res.status(200).send(`Welcome to the Cloud, ${name}!`)
	})

	// Post a greeting to a specific person
	// to demonstrate req.body
	// > try it by posting {"name": "the_name" } as
	// an application/json body to {{host}}/persons
	app.post('/persons', async (req: Request, res: Response) => {
		const { name } = req.body
		if (!name) {
			return res.status(400).send(`name is required`)
		}
		return res.status(200).send(`Welcome to the Cloud, ${name}!`)
	})

	// GET a list of cars
	// it should be filterable by make with a query paramater
	// > try it {{host}}/cars?make=the_make
	app.get('/cars', async (req: Request, res: Response) => {
		const { make } = req.query
		if (make) {
			const makeCars = cars.filter((car) => car.make === make)
			if (makeCars.length === 0) {
				return res.status(404).send(`No Cars found with make ${make}`)
			}
			return res.status(200).json({ cars: makeCars })
		}
		return res.status(200).json({ cars })
	})

	// Add an endpoint to get a specific car
	// it should require id
	// it should fail gracefully if no matching car is found
	app.get('/cars/:id', async (req: Request, res: Response) => {
		const { id } = req.params
		if (!id) {
			return res.status(400).send(`id is required in /cars/:id`)
		}
		const carWithId = cars.find((car) => car.id.toString() === id)
		if (!carWithId) {
			return res.status(404).send(`No Cars found with id ${id}`)
		}
		return res.status(200).json({ car: carWithId })
	})

	/// Add an endpoint to post a new car to our list
	// it should require id, type, model, and cost
	app.post('/cars', async (req: Request, res: Response) => {
		const { id, type, model, cost, make } = req.body
		const car = { id, type, model, cost, make }
		const errors = []
		for (const [key, value] of Object.entries(car)) {
			if (!value) {
				errors.push(`${key} is missing`)
			}
		}
		if (errors.length > 0) {
			return res.status(400).json({ errors })
		}
		car.id = parseInt(car.id)
		car.cost = parseInt(car.cost)
		cars.push({ ...car })
		return res.status(201).json(car)
	})

	// Start the Server
	app.listen(port, () => {
		console.log(`server running http://localhost:${port}`)
		console.log(`press CTRL+C to stop server`)
	})
})()
