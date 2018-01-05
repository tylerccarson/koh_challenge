const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//used for email validation: pubkey-0a4ec739abef53cc9131403ce34d7eef... although I have to add a credit card for that.
//private key: key-beb3e042e4930cb11f422165edc0a054


app.use(express.static(__dirname + '/../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/*', (req, res) => {
  res.redirect('/');
});

app.post('/email', (req, res) => {
  console.log(req.body);

  var api_key = 'key-beb3e042e4930cb11f422165edc0a054';
  var domain = 'sandbox5f1fbe91043b482b84d8e180a36b5f33.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
   
  var data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'serobnic@mail.ru',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!'
  };
   
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });

  res.sendStatus(200);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port + '...');
});