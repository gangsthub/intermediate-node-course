const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = 8000
const app = express()

const User = require('./models/User')
mongoose.connect('mongodb://localhost/userData')

app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`server is listening on port:${port}`)
})

// CREATE
app.post('/users', (req, res) => {
  const { newData } = req.body
  User.create(
    {
      name: newData && newData.name,
      email: newData && newData.email,
      password: newData && newData.password,
    },
    (err, data) => {
      if (err) {
        res.json({ success: false, message: err })
      } else if (!data) {
        res.json({ success: false, message: 'Not Found' })
      } else {
        res.json({ success: true, data: data })
      }
    }
  )
})

app
  .route('/users/:id')
  // READ
  .get((req, res) => {
    User.findById(req.params.id, (err, data) => {
      if (err) {
        res.json({
          success: false,
          message: err,
        })
      } else if (!data) {
        res.json({
          success: false,
          message: 'Not Found',
        })
      } else {
        res.json({
          success: true,
          data: data,
        })
      }
    })
  })
  // UPDATE
  .put((req, res) => {
    // User.findByIdAndUpdate()
  })
  // DELETE
  .delete((req, res) => {
    // User.findByIdAndDelete()
  })
