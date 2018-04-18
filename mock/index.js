const Mock = require('mockjs')
const express = require('express')
const app = express()

const defaults = require('../config').mock
const product = require('./product')
const company = require('./company')

app.use(express.static(__dirname))

app.use('/home/product', product)
app.use('/home/company', company)

app.listen(defaults.proxyPort, () => {
  console.log(`mock server is listening at ${defaults.proxyPort}`)
})
