// const nodemailer = require("nodemailer")

// const sendMail = async (mailOptions) => {
//     let transporter = nodemailer.createTransport({

//         host : process.env.SMTP_HOST,
//         port : process.env.SMTP_PORT,
//         auth : {
//             user : process.env.SMTP_USER,
//             pass : process.env.SMTP_PASS
//         }
//     })

//     let info = await transporter.sendMail(mailOptions)
//     console.log(`Message Sent : ${info.messageId}`);

// }

// module.exports = sendMail

const nodemailer = require("nodemailer")

const sendMail = async (mailOptions) => {
    var transport = nodemailer.createTransport( {
        service: "hotmail",
        auth: {
            user: "far.sahin@hotmail.com",
            pass: "04427677556a"
        }
    });
    let info = await transport.sendMail(mailOptions)
    console.log(`Message Sent : ${info.messageId}`);

}



module.exports = sendMail