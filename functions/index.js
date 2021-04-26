const functions = require("firebase-functions")
const express = require('express')
const cors = require('cors')
const { getTasks, createTask, getSingleTask, updateTask, deleteTasks, returnTasks } = require('./src/tasks')
const engines = require('consolidate')

const app = express()
app.use(cors())
app.engine('hbs', engines.handlebars)
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/tasks', getTasks)
app.post('/tasks', createTask)
app.get('/tasks/:taskId', getSingleTask)
app.patch('/tasks/:taskId',updateTask)
app.delete('tasks/:taskId', deleteTasks)
app.get('/', (req, res) => {
  returnTasks(ourTasks => {
    console.log(ourTasks)
    res.render('index', { ourTasks })
  })
})

exports.app = functions.https.onRequest(app)