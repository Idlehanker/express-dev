const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

router.use((req, res, next) =>{
  console.log('\nTime:', Date.now())
  next()
});
router.use('/user/:id', (req, res, next)=>{
  console.log('Request URL:', req.originalUrl)
  next()
},(req, res, next)=> {
  console.log('Request Type: ', req.method)
  next()
})

router.get('/user/:id', (req, res, next)=>{
  if(req.params.id === '0') next('route')
  else next()
}, (req, res, next)=>{
  console.log('regular')
  res.render('regular',{title: 'regular', message: 'rg msg'})
})

router.get('/user/:id', (req, res, next)=>{
  console.log('special')
  res.render('special', {title: 'special', message: 'sp msg'})
})

app.use('/', router)

module.exports = app
