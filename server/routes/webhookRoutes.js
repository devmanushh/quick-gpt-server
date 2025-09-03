import express from 'express'
import { stripeWebhooks } from '../controllers/webhooks.js'

const webhookRouter = express.Router()

webhookRouter.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

export default webhookRouter