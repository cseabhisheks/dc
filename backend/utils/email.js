const express = require('express')
const router = express.Router()
const ejs = require('ejs')
const nodemailer = require('nodemailer')
router.post('/sent', async (req, res) => {
    const { name, email, phoneNo, message } = req.body
    try {
        const htmlContent = await ejs.renderFile('./view/emailTemplate.ejs', {
            name: name, email: email, phoneNo: phoneNo, message: message
        });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'devmagnets.mail@gmail.com',
                pass: process.env.GMAIL_PASSWORD
            }
        })
        const mailOption = {
            from: 'devmagnets.mail@gmail.com',
            to: 'singhabhishek.engineer@gmail.com',
            replyTo: email,
            subject: 'Client Inquiry',
            html: htmlContent
        }
        transporter.sendMail(mailOption, (err, info) => {
            if (err) {
                console.log(err.message)
                res.send({ message: 'failed' })
            }
            else {
                console.log(info.response)
                res.send({ message: 'sent' })
            }
        })
    } catch (err) {
        console.log(err.message)
        res.send('failed try catch')

    }
})

module.exports = router