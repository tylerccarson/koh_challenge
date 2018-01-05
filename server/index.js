const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const credentials = require('./credentials.js');

app.use(express.static(__dirname + '/../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/email', (req, res) => {
  res.redirect('/');
});

app.post('/email', (req, res) => {

  var api_key = credentials.api_key;
  var domain = credentials.domain;
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
   
  var data = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.content
  };
   
  mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);

      //use other service!!!

      res.sendStatus(500);
    }
    
    res.send(body.message);
  });

});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port + '...');
});