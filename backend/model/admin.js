const mongoose=require('mongoose')
const adminSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
})
const adminModel=mongoose.model('adminModel',adminSchema)
module.exports=adminModel