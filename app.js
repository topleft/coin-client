// App entry point, serves index.html statically on every url so we can use react router

const express = require('express')
const path = require('path')
const app = express()

const proxy = require('express-http-proxy')
const port = process.env.PORT || 3000

app.use(express.static('./build'))
// use this proxy to send any fetch to our back-end server
app.use('/api', proxy(process.env.BACKEND_ADDR || 'http://localhost:3030', {
  forwardPath: (req) => {
    console.log("req.url", req.url);
    console.log('process.env.BACKEND_ADDR', process.env.BACKEND_ADDR);
    `/api${req.url}`
  }
}))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'))
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
