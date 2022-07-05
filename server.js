const client = require('./databasepg');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { path } = require('express/lib/application');
const { user } = require('pg/lib/defaults');
const { redirect } = require('express/lib/response');
const port = 3000;



let profileName = '';
let profileEmail = '';

app.use( bodyParser.json({
  limit: '50mb', 
  extended: true
}) ); 
app.use(bodyParser.urlencoded({
  limit: '50mb',  
  extended: true})); 
app.use(cors());

app.get('/signup.html', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/login.html');
});
app.get('/login.html', function (req, res) {
  res.sendFile(__dirname + '/login.html');
});

app.get('/main.css', function (req, res) {
  res.sendFile(__dirname + '/main.css');
});
app.get('/user.css', function (req, res) {
  res.sendFile(__dirname + '/user.css');
});

app.get('/index.js', function (req, res) {
  res.sendFile(__dirname + '/index.js');
});

app.get('/user.html', (req, res) => {
  res.sendFile(__dirname + '/user.html');

  // client.query(`SELECT * FROM img`,  (err, res) => {
  //   if(!err) {
  //     console.log(res.rows);
  //     console.log("display");
  //   } else {
  //     console.log("error");
  //     console.log(err.message);
  //   }
  // });


});
app.get("/images/pp.jpg", (req, res) => {
  res.sendFile(__dirname + "/images/pp.jpg");
});


app.post('/user.html', (req, res1) => {
  console.log("XXXXXXXXXXX");
  client.query(`INSERT INTO img VALUES('${req.body.imageUploads}' )` , (err, res) => {
    if(!err) {
      console.log("PHOTO ADDED");
      client.query(`SELECT * FROM img`,  (err, res) => {
        if(!err) {
          console.log("display");
          res1.send(res.rows);
        } else {
          console.log("error");
          console.log(err.message);
        }
      });

      // res1.send("s"); //  successful
    } else {
      console.log(err.message);
      // res1.send("f"); // fail
    }
  });

});


app.post('/login.html', (req, res2) =>{
  let msg = '';
  console.log("Login");
  //res.send(`Username: ${userEmail} Password: ${userPassword}`);
  console.log(`Email: ${req.body.emailLogin} Password: ${req.body.passwordLogin}`);
  client.query(`SELECT * FROM users`,  (err, res) => { 
    if(!err) {
      console.log(res.rows);
      for (const element of res.rows) {
        if(element.userEmail === req.body.emailLogin && element.userPassword === req.body.passwordLogin) {
          profileName = element.userName;
          profileEmail = element.userEmail;
          console.log(profileName);
          msg = "s"; 
          break;
        } 
        else {
           msg = "lf";
        }
      } 
      // "Cannot set headers after they are sent to the client " -> we used 2 ifs to get this error
      if(msg === "s") {
        return res2.send("s"); //login successful
      } else {
        return res2.send("lf"); //login fail
      }
    } else {
      console.log(err.message);
    } });
});


app.post('/signup.html', (req, res1) =>{
  console.log("Registration");
  // console.log(`Name: ${req.body.signupName} Email: ${req.body.signupEmail} Password: ${req.body.signupPassword} Password Confirm: ${req.body.signupPasswordConfirm}`);
  let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(filter.test(req.body.emailSignup)) {
    client.query(`INSERT INTO users VALUES('${req.body.name}', '${req.body.emailSignup}', '${req.body.passwordSignup}', '${req.body.passwordConfirm}' )` , (err, res) => {
      if(!err) {
        console.log("USER ADDED");
        console.log(req.body.emailSignup);
        res1.send("s"); // registiration successful
      } else {
        console.log(err.message);
        if(err.message.includes('unique constraint "users_userEmail_key"')){
          res1.send("f"); 
        } else if (err.message.includes('"users" violates check constraint "passCon"')) {
          console.log("Passwords Do Not Match");
          res1.send("pf"); // passwords fail
        }
        else {
          res1.send("x"); // another error
        }
    }});
  } else {
    res1.send("ef"); // email fail
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
