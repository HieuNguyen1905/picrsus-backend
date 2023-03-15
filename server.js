require("dotenv").config();
const express = require('express');
const allRoutes = require('./controllers');
const sequelize = require('./config/connection');
//Cors is used to allow front-end connect to the back-end database (will be used latter)
const cors = require("cors")
var cookieParser = require("cookie-parser");
const multer = require('multer')

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Requiring our models for syncing
const { User } = require('./models');

app.use(cookieParser())
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), function (req, res, next) {
  const file = req.file
  res.status(200).json(file.filename)
})


app.use('/', allRoutes);

sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
  });
});