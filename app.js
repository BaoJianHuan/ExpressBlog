const express = require('express')
const logger = require('morgan')
const users = require('./routes/users')
const mongoose = require('mongoose')
mongoose.connect('mongodb://bao:bao123@ds157064.mlab.com:57064/blog', { useNewUrlParser: true })


const app = express()
//Middlewares
app.use(logger('dev'))

app.use('/users', users)

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    res.status(status).json({
        error: {
            message: error.message
        }
    })
    console.error(err)
})
// mongodb://<dbuser>:<dbpassword>@ds157064.mlab.com:57064/blog
// baojianhuan 123
const port = app.get('port') || 3000

app.listen(port, () => console.log(`Server is listening on port ${port}`))