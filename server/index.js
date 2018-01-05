const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helpers = require('./helpers.js');

app.use(express.static(__dirname + '/../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/email', (req, res) => {

  let msg = {
    to: req.body.to,
    from: req.body.from,
    subject: req.body.subject,
    text: req.body.content
  };

  let successBtn = 
    '<form action="/" method="GET">\
      <button type="submit" >Success! Back to home page.</button>\
    </form>';

  let failBtn = 
    '<form action="/" method="GET">\
      <button type="submit" >Send failed. Try again!</button>\
    </form>';

  helpers.sendViaMailgun(msg, (error, body) => {
    if (error) {

      helpers.sendViaSendGrid(msg, (error, result) => {

        if (error) {

          res.send(failBtn);
        }

        res.send(successBtn);

      });
    }

    res.send(successBtn);

  });

});

app.get('/email', (req, res) => {
  res.redirect('/');
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port + '...');
});