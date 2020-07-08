const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const inventoryRouter = require('./routers/inventoryAdmin')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const auth = require('./middleware/auth')


const app = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(userRouter)
app.use(inventoryRouter)

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('home',{
        title:'MILOve'
    })
}) 

// app.get('/product', (req,res)=>{
//     res.render('product',{
//         title: 'About me',
//         name:'Kenan Collaco'
//     })
// })

app.get('/login',(req,res)=>{
    res.render('loginPage',{
        title:'Create User',
        name:'Huloq'
    })
})

app.get('/signup',(req,res)=>{
    res.render('signUp',{
        title:'Create User',
        name:'Huloq'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})