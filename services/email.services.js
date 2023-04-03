const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

const emailService = async (type_of_action, url, username, receiver, action_description) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'SendinBlue',
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.NODEMAILER_EMAIL, // generated ethereal user
            pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let response = {
        acceptedMail : [],
        err: "NULL"
    }

    try {
        const html = fs.readFileSync(__dirname + '/pages/templateEmail.html', {encoding: 'utf-8'});
        const template = handlebars.compile(html);
        const replacements = {
            username,
            type_of_action,
            action_description,
            address: "Surat | Ahmedabad | Lucknow",
            url
        };
        const htmlToSend = template(replacements);
        const res = await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL, // sender address
            to: receiver, // list of receivers
            subject: type_of_action, // Subject line
            text: type_of_action, // plain text body
            html: htmlToSend, // html body
        });
        res.accepted.map(mail => response.acceptedMail.push(mail));
        return response;
    } catch (error) {
        response.err = error ;
        return response;
    }
};


module.exports = emailService;