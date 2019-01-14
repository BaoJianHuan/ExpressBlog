const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const router=require('./router')

const app = express()

const port = 3000

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'views'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(router)

app.get('**',(req, res)=>{
    res.render('404.html')
})

app.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(500).send('Something broke!')
})
app.listen(port, () => console.log(`My blog app listening on port ${port}!`))