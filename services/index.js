const emailService = require('./email.services');
const { imageUploaderMulti, imageUploaderSingle } = require('./imageUploader.services')

module.exports = {
    emailService,
    imageUploaderMulti,
    imageUploaderSingle
}