const express = require('express')
const Inventory = require('../models/inventoryAdmin')
const multer = require('multer')
const sharp = require('sharp')

const router = new express.Router()

router.post('/inventory', async (req,res)=>{
    const inventory =new Inventory(req.body)
    try{
        await inventory.save()
        res.status(200).send(inventory)
    } catch(e){
        res.status(400).send(e)
    }
})


router.get('/inventory', async (req,res)=>{
    try{
            Inventory.find(function(err,docs){
            var productChunks = [];
            var chunkSize = 3;
            for (var i=0; i< docs.length; i+=chunkSize){
                productChunks.push(docs.slice(i, i+chunkSize))
            }
            res.render('shop/index',{title:'Shopping Cart', products: productChunks});
        })
        
    }catch(e){
        res.status(404).send()
    }
})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload picture'))
        }
        cb(undefined, true)
    }
})

router.post('/inventory/img/:id',  upload.single('img'), async (req,res)=>{
    const _id = req.params.id
    const inventory = await Inventory.findById(_id)
    if(!inventory){
        return res.status(404).send()
    }
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    inventory.image = buffer
    await inventory.save()
    res.send()
},(error,req,res,next) =>{
    res.status(400).send({error: error.message})
})


router.get('/inventory/img/:id', async (req,res)=>{
    try{
        const _id = req.params.id
        const inventory = await Inventory.findById(_id)
        if(!inventory || !inventory.image){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(inventory.image)
    }catch(e){
        res.status(404).send()
    }
    
})

router.get('/product/:id', async (req,res)=>{
    try{
        const _id = req.params.id
        Inventory.findById(_id, function(err,docs){
            res.render('shop/product',{title:'Shopping Cart', products: docs});
        })
    }catch(e){
        res.status(404).send()
    }
})

router.get('/products/:type', async(req,res)=>{
    try{
        const type = req.params.type
        Inventory.find({ product_type:type}, function(err,docs){
            var productChunks = [];
            var chunkSize = 3;
            for (var i=0; i< docs.length; i+=chunkSize){
                productChunks.push(docs.slice(i, i+chunkSize))
            }
            res.render('shop/index',{title:'Shopping Cart', products: productChunks});
        })
    }catch(e){
        res.status(404).send()
    }
})


module.exports = router