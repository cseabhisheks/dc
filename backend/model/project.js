const mongoose = require('mongoose')
const projectSchema = mongoose.Schema({
    video: String,
    siteLocation: String,
    cid: String,
    Date: {
        type: Date,
        default: Date.now
    }
})
const projectModel = mongoose.model('projectModel', projectSchema)
module.exports = projectModel