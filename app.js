const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
var User = require('./models/user.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var MONGO_URI = "mongodb+srv://tej:tpa4401@first-bvv78.gcp.mongodb.net/school?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DATABASE connected Properly!'))
  .catch((err) => console.log('Error is ', err.message));
var n;
var p;
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}
// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

// Init app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.json());
// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));
app.post('/upload',(req,res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('index', {
        msg: err,
        vis1:'hide'
      });
    } else {
      if (req.file == undefined) {
        res.render('index', {
          msg: 'Error: No File Selected!',
          vis1:'hide'
        });
      } else {
        
        var update = { pic1: req.file.filename}
        console.log(req.file.filename);
        console.log(n);
        User.updateOne({ name: n,password:p }, update)
          .then((profile) => {
            // console.log(profile)
          })
          
          .catch(err => {
            console.log('Error is ', err.message);
          })
        res.render('img2', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`,
          vis1: 'hide'
        });
      }
    }
  });
});
app.post('/upload2', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('index', {
        msg: err,
        vis1: 'hide'
      });
    } else {
      if (req.file == undefined) {
        res.render('index', {
          msg: 'Error: No File Selected!',
          vis1: 'hide'
        });
      } else {
        res.render('img3', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`,
          vis1: 'hide'
        });
        console.log(req.file.filename);
        console.log(n);
        var update = { pic2: req.file.filename }
        User.updateOne({ name: n, password: p }, update)
          .then((profile) => {
            // console.log(profile)
          })
          .catch(err => {
            console.log('Error is ', err.message);
          })
      }
    }
  });
});
app.post('/upload3', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('index', {
        msg: err,
        vis1: 'hide'
      });
    } else {
      if (req.file == undefined) {
        res.render('index', {
          msg: 'Error: No File Selected!',
          vis1: 'hide'
        });
      } else {
        res.render('img4', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`,
          vis1: 'hide'
        });
        var update = { pic3: req.file.filename }
        User.updateOne({ name: n, password: p }, update)
          .then((profile) => {
            // console.log(profile)
          })
          .catch(err => {
            console.log('Error is ', err.message);
          })
      }
    }
  });
});
app.post('/upload4', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('index', {
        msg: err,
        vis1: 'hide'
      });
    } else {
      if (req.file == undefined) {
        res.render('index', {
          msg: 'Error: No File Selected!',
          vis1: 'hide'
        });
      } else {
        res.render('img5', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`,
          vis1: 'hide'
        });
        var update = { pic4: req.file.filename }
        User.updateOne({ name: n, password: p }, update)
          .then((profile) => {
            // console.log(profile)
          })
          .catch(err => {
            console.log('Error is ', err.message);
          })
      }
    }
  });
});
app.post('/upload5', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('index', {
        msg: err,
        vis1: 'hide'
      });
    } else {
      if (req.file == undefined) {
        res.render('index', {
          msg: 'Error: No File Selected!',
          vis1: 'hide'
        });
      } else {
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`,
          vis1: 'hide'
        });
        var update = { pic5: req.file.filename}
        User.updateOne({ name: n, password: p }, update)
          .then((profile) => {
            // console.log(profile)
          })
          .catch(err => {
            console.log('Error is ', err.message);
          })
      }
    }
  });
});
app.post('/login', (req, res) => {
  const obj = JSON.parse(JSON.stringify(req.body))
  console.log(obj);
  User.find({ name: obj.name, password: obj.password })
    .then((user) => {
      if (user.length == 0) {
        var user = new User({
          name: obj.name,
          password: obj.password,
          img: '',
          pic1:'',
          pic2:'',
          pic3:'',
          pic4:'',
          pic5:''
        });
        user.save();
        n = obj.name;
        p = obj.password;
        res.render('img1', {
          msg: 'Data Uploaded!',
          vis1: 'show'
          // file: `uploads/${req.file.filename}`
        });
      }
      else {
        res.render('index', {
          msg: 'Data Not Uploaded!',
          vis1:'hide'
          // file: `uploads/${req.file.filename}`
        });
      }
    })
    .catch((err) => console.log('Error is ', err.message));
});
app.get('/welcome',(req,res)=>{
  res.render('form',{});
})
app.post('/signin',(req,res)=>{
  name = req.body.name;
  a=[];
  const testFolder = './public/uploads';
  const fs = require('fs');

  var files = fs.readdirSync(testFolder);
  console.log(files);
  for (i = 0; i < 5; i++) {
    a[i]=randomInt(0, 100);
  }
  const obj = JSON.parse(JSON.stringify(req.body))
  User.find({ name: obj.name})
    .then((user) => {
      if (user[0].password == req.body.password) {
        // res.cookie('loggedIn', req.body.rollno, {
        //   httpOnly: true
        // });
        // res.cookie('log', true, {
        //     httpOnly: true
        // });
        console.log(user);
        res.render('signin', {
          file1: files[a[0]],
          file2: files[a[1]],
          file3: files[a[2]],
          file4: files[a[3]],
          file5: files[a[4]],
          file6: user[0].pic1,
          file7: user[0].pic2,
          file8: user[0].pic3,
          file9: user[0].pic4,
          file10: user[0].pic5
        })

      }
      else {
        // res.render('student-login', {
        //   msg1: "",
        //   msg2: "Wrong password"
        // });
      }
    })
    .catch(err => {
      console.log('Error is ', err.message);
    })
  })
  app.post('/auth',(req,res)=>{
    const obj = JSON.parse(JSON.stringify(req.body))
      console.log(obj);
    if (obj.file6 == "true" && obj.file7 == "true" && obj.file8 == "true" && obj.file9 == "true" && obj.file10 == "true" && obj.file1 != "true" && obj.file2 != "true" && obj.file3 != "true" && obj.file4 != "true" && obj.file5 != "true"){
      res.render('home');
    }
    else{
      res.render('form');
    }
  })
const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));