const emailService = require('./email.services');
const {
	imageUploaderMulti,
	imageUploaderSingle,
} = require('./imageUploader.services');
const bookingService = require('./booking.services');

module.exports = {
	emailService,
	imageUploaderMulti,
	imageUploaderSingle,
	bookingService,
};
