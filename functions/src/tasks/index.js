const admin = require('firebase-admin')
const serviceAccount = require('../../credentials.json')

let db;

function connectToFirestore() {
  if (!db) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
    db = admin.firestore()
  }
}

exports.getTasks = (req, res) => {
  connectToFirestore()
  db.collection('tasks').get()
    .then(collection => {
      let ourTasks = []
      collection.forEach(doc => {
        let thisTask = doc.data()
        thisTask.id = doc.id
        ourTasks.push(thisTask)
      })
      res.set('Cache-Control', 'public, max-age=90, s-maxage=120')
      res.send(ourTasks)
    })
    .catch(err => res.status(500).send('Error getting tasks: ' + err.message))
}

exports.createTask = (req, res) => {
  connectToFirestore()
  const newTask = req.body
  db.collection('tasks').add(newTask)
    .then(() => this.getTasks(req, res))
    .catch(err => res.status(500).send('Error creating task: ' + err.message))
}

//exports.getSingleTask = (req, res) => {
//  connectToFirestore()
//  const singleTask = req.params
//  db.collection('tasks').get()
//    .then(() => singleTask)
//    .catch(err => res.status(500).send('Error getting single task: ' + err.message))
//}

// this one gets last task

exports.getSingleTask = (req, res) => {
  connectToFirestore()
  db.collection('tasks').get()
    .then(collection => {
      let ourTasks = {}
       collection.forEach(doc => {
        let thisTask = doc.data()
        ourTasks = thisTask
      })
      res.send(ourTasks)
    })
    .catch(err => res.status(500).send('Error getting this task: ' + err.message))
}

//exports.getSingleTask = (req, res) => {
//  connectToFirestore()
//  db.collection('tasks').get()
//    .then(collection => {
//      let ourTasks = {}
//      collection.forEach(doc => {
//        let thisTask = doc.data()
//        thisTask.id = doc.id
//        ourTasks = thisTask
//      })
//
//      res.send(ourTasks)
//    })
//    .catch(err => res.status(500).send('Error getting this task: ' + err.message))
//}