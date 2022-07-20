const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
let db = null

//connect to Mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log('Connected!')

  // connect to myproject database
  db = client.db('badbank')
})

// create user account
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users')
    const doc = { name, email, password, balance: 0 }
    collection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc)
    })
  })
}

//find user account
function find(emil) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .find({ email: email })
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs)
      })
  })
}

// find one user account
function findOne(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .findOne({ email: email })
      .toArray(function (err, doc) {
        err ? reject(err) : resolve(doc)
      })
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
        function (err, doc) {
          err ? reject(err) : resolve(doc)
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
