const serviceHandler = require('./service-handler');
const { getPagination, getPagingData } = require('./pagination');
const sendMail = require('./send-mail');

module.exports = { serviceHandler, getPagination, getPagingData, sendMail };
