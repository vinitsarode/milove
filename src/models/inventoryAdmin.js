const mongoose = require('mongoose')
const validator = require('validator')

const inventorySchema = new mongoose.Schema({
    product_id:{
        type: String,
        required:true,
        trim:true
    },
    name:{
        type: String,
        required:true,
        trim:true
    },
    price:{
        type: Number,
        required:true,
        trim: true
    },
    product_type:{
        type: String,
        required:true,
        trim:true
    },
    quantity:{
        type: Number,
        required:true,
        trim: true
    },
    description:{
        type: String,
        required:true,
        trim:true
    },
    image:{
        type:Buffer
    }
},{
    timestamps:true   
})

inventorySchema.statics.findByCredentials = async (product_id) =>{
    const pdt = await User.findOne({product_id})

    if(!pdt){
        throw new Error ('Unable to find product')
    }
    
    return pdt
}

const Inventory = mongoose.model('Inventory', inventorySchema )

module.exports = Inventory