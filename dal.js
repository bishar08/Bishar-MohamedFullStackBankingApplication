const MongoClient = require('mongodb').MongoClient
//const ObjectId = require('mongoose').Types.ObjectId
const url = 'mongodb://localhost:27017'
var db = null

//'mongodb://localhost:27017'
//connect to Mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log('Connected!')

  // connect to myproject database
  db = client.db('my_project')
})

// create user account
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users')
    const doc = { name, email, password, balance: 0 }
    collection.insertOne(doc, { w: 1 }, function (err, result) {
      console.log('dal.js create user: ', doc)
      console.log('dal.js create result: ', result)
      err ? reject(err) : resolve(doc)
    })
  })
}

//find user accounta
function find(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .find({ email: email })
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs)
      })
  })
}

// find user account
function findOne(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .findOne({ email: email })
      .then((doc) => resolve(doc))
      .catch((err) => reject(err))
  })
}

// update - deposit/withdraw amount
function update(email, amount) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .findOneAndUpdate(
        { email: email },
        { $inc: { balance: amount } },
        { returnOriginal: false },
        function (err, documents) {
          err ? reject(err) : resolve(documents)
        }
      )
  })
}

// all user
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .find({})
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs)
      })
  })
}

module.exports = { create, find, findOne, update, all }
