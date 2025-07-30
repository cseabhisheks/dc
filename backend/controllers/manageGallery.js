const express = require('express')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const router = express.Router()
const galleryModel = require('../model/gallery')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET

})
const storage = multer.memoryStorage()
const upload = multer({ storage })


function uploadToCloudinary(buffer) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (err, result) => {
            if (err) return reject(err)
            resolve({
                url: result.secure_url,
                id: result.public_id
            })
        }).end(buffer)
    })
}

router.post('/', upload.array('fcDesign', 10), async (req, res) => {
    try {
        if (req.files.length == 0) {
            res.json('you didnt select any pic to upload,please choose atleast one to upload')
        }
        for (const file of req.files) {
            const uploadedFile = await uploadToCloudinary(file.buffer)
            await galleryModel.create({
                imageUrl: uploadedFile.url,
                id: uploadedFile.id,
                category: req.body.category
            })

        }
        res.redirect(`${process.env.FRONTEND}/admin`)
    }
    catch (err) {
        res.json({ 'err': err.message })
    }

})
router.get('/fetch', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    const g = await galleryModel.find()
    res.json({ img: g })
})
router.delete('/delete:id', async (req, res) => {
    const id = req.params.id
    const user = await galleryModel.deleteOne({ id: id })
    cloudinary.uploader.destroy(id, (error, result) => {
        if (error) {
            // Handle error (not found, credentials, etc.)
            console.error('Delete failed', error);
        } else {
            console.log('Delete result:', result);
        }
    });
    res.json({ message: 'Image Deleted Sucessfully' })
})
router.patch('/patch:id', async (req, res) => {
    const p = await galleryModel.updateOne({ id: req.params.id }, { category: req.body.category })
    res.json({ message: 'category modified succesfully' })
})
module.exports = router



