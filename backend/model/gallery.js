const mongoose=require('mongoose')
const date=()=>{
    return new Date(Date.now())
}
const gallerySchema=mongoose.Schema({
    imageUrl:String,
    id:String,
    category:String,
    date: {
    type: Date,
    default: date  // ✅ correct usage (pass function reference)
  }
})
const galleryModel=mongoose.model('galleryModel',gallerySchema)
module.exports=galleryModel