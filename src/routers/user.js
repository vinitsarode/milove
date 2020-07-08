const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
//const {sendWelcomeEmail, sendCancellationEmail}= require('../emails/account')
//const multer = require('multer')
const router = new express.Router()

router.post('/users', async (req,res)=>{
    const user =new User(req.body)
    try{
        await user.save()
        //sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.cookie('auth_token', token)
        //res.sendFile(path.resolve(__dirname, '../../templates/views/dashBoard.hbs'))
        res.redirect('/')
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('auth_token', token)
        //res.sendFile(path.resolve(__dirname, '../../templates/views/dashBoard.hbs'))
        res.redirect('/')
    }catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout',auth, async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        //res.redirect('')
        res.send('logged out')
    }catch(e){
        res.status(500).send() 
    }

})

router.post('/users/logoutAll', auth, async (req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        //res.redirect('')
        res.send()

    }catch(e){
        res.status(500).send() 
    }
})

router.get('/users/me', auth, async (req,res)=>{
    res.send(req.user)
})

router.patch('/users/me', auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    console.log(req.body.name)
    const allowedUpdates = ['name','email','password']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates'})
    }
    try{ 
        updates.forEach((update)=> req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)

    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req,res)=>{
    try{
        await req.user.remove()
        sendCancellationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch(e) {
        res.status(500).send()
    }
})



// router.get('/dashboard', auth, async(req,res)=>{
//     try{
//         res.redirect('/dashboard')
//     }catch(e){
//         res.status(400).send()
//     }
// })


module.exports = router