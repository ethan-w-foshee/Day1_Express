
const express = require('express')
const bPars = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
app.use(express.json())
/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.json(users)
})

app.get(`/users/:userId`, (req, res) => {
  res.json(users[req.params.userId - 1])
})

app.post('/users', (req, res) => {
  req.body._id = users.length + 1
  users.push(req.body)
  res.send(users)
})

app.put(`/users/:userId`, (req, res) => {
    req.body._id = users[req.params.userId - 1]._id
    users[req.params.userId - 1] = req.body
    res.send(users)
})

app.delete(`/users/:userId`, (req, res) => {
  users[req.params.userId].isActive = false
  res.send("Deleted")
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))