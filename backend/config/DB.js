const mongoose = require('mongoose')
const connectDB = () => {
    mongoose.connect(process.env.DB_LINK)
    .then(() => {
        console.log('db is connected')
    })
    .catch((err) => {
        console.error(`err: ${err}`)
    })
}

module.exports = connectDB