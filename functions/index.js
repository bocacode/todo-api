const functions = require("firebase-functions")
const express = require('express')
const cors = require('cors')
const { getTasks, createTask, getSingleTask, updateTask } = require('./src/tasks')

const app = express()
app.use(cors())

app.get('/tasks', getTasks)
app.post('/tasks', createTask)
app.get('/singletask', getSingleTask)
app.patch('/tasks/:taskId',updateTask)

exports.app = functions.https.onRequest(app)