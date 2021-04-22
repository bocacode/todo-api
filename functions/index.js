const functions = require("firebase-functions")
const express = require('express')
const cors = require('cors')
const { getTasks, createTask } = require('./src/tasks')

const app = express()
app.use(cors())

app.get('/tasks', getTasks)
app.post('/tasks', createTask)
app.get('/stupid', (req, res) => res.send('stupid'))

exports.app = functions.https.onRequest(app)