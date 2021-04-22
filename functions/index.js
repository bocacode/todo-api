const functions = require("firebase-functions")
const express = require('express')
const cors = require('cors')
const { getTasks, createTask, getSingleTask, updateTask, deleteTasks } = require('./src/tasks')

const app = express()
app.use(cors())

app.get('/tasks', getTasks)
app.post('/tasks', createTask)
app.get('/tasks/:taskId', getSingleTask)
app.patch('/tasks/:taskId',updateTask)
app.delete('tasks/:taskId', deleteTasks)

exports.app = functions.https.onRequest(app)