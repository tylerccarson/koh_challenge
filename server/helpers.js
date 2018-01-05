const credentials = require('./credentials.js');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(credentials.sendgrid.api_key);
const mailgun = require('mailgun-js')({apiKey: credentials.mailgun.api_key, domain: credentials.mailgun.domain});

module.exports.sendViaSendGrid = (msg, callback) => {
  sgMail.send(msg, (result) => {
    callback(result);
  });
};

module.exports.sendViaMailgun = (msg, callback) => {   
  mailgun.messages().send(msg, (result) => {
    callback(result);
  });
};







