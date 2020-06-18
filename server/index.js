const express = require('express')
const path = require('path')
const compress = require('compression')
const history = require('connect-history-api-fallback')

const router = require('./router')

const app = express()

app
  .use(
    compress({
      level: 8,
      filter() {
        return true
      },
    })
  )
  .use('/api', router)
  .use(history())
  .use(express.static(path.join(__dirname, 'dist')))

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
 
  next()
})

// 开启服务
app.listen(4000, () => {
  console.log('Server listening on http://localhost:4000')
})
