const express = require('express')
const router = express.Router()
const project = require('../model/project')
const cloudinary = require('cloudinary').v2
const multer = require('multer')

router.use(express.json())

const storage = multer.memoryStorage()
const upload = multer({ storage })

function uploadToCloudinary(buffer) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'video' }, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve({
                url: result.secure_url,
                id: result.public_id
            })
        }).end(buffer)
    })
}

router.post('/', upload.array('fcProject', 10), async (req, res) => {
    try {
        if (req.files.length == 0) {
            res.json({ mess: 'you have not selected any file' })
        }
        for (const file of req.files) {
            const uploadedFile = await uploadToCloudinary(file.buffer)
            await project.create({
                video: uploadedFile.url,
                siteLocation: req.body.siteLocation,
                cid: uploadedFile.id
            })
        }
        res.redirect(`${process.env.FRONTEND}/admin/manage-project`)
    } catch (err) {
        res.json('err', err)
    }

})
router.get('/fetch', async (req, res) => {
    const p = await project.find()
    res.json({ project: p })
})
router.delete('/delete:cid', async (req, res) => {
    const cid = req.params.cid
    const user = await project.deleteOne({ cid: cid })
    cloudinary.uploader.destroy(cid, { resource_type: 'video' }, (error, result) => {
        if (error) {
            // Handle error (not found, credentials, etc.)
            console.error('Delete failed', error);
        } else {
            console.log('Delete result:', result);
        }
    });
    res.json({ message: 'project Deleted Sucessfully' })
})
router.patch('/patch:cid', async (req, res) => {
    const p = await project.updateOne({ cid: req.params.cid }, { siteLocation: req.body.siteLocation })
    res.json({ message: 'project modified succesfully' })
})
module.exports = router
