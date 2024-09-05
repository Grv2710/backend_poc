// const mongoose = require('mongoose');
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// mongoose.connect('mongodb://localhost/viPoc').then(()=> console.log('connected to db')).catch(err => console.log(err));

// const app = express();
// app.use(express.json());
// app.use('/static', express.static(path.join(__dirname, 'static')));
// // const dataSchema = new mongoose.Schema({
// //     pocName: {
// //         type: String,
// //         required: true,
// //     },
// //     dateOfInsertion : {
// //         type: Date,
// //         default: Date.now
// //     },
// //     data: mongoose.Schema.Types.Mixed
// // })

// const dataSchema = new mongoose.Schema({
//     pocName: {
//         type: String,
//         required: true,
//     },
//     dateOfInsertion: {
//         type: Date,
//         default: Date.now,
//     },
//     imageURL: {
//         type: String,
//     }
// }, { strict: false });

// const Data = mongoose.model("Data", dataSchema);

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'static');
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname));
//     }
//   });
  
//   const upload = multer({ storage: storage });


//   app.post('/upload', (req, res, next) => {
//     upload.single('image')(req, res, (err) => {
//       if (err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
//         return res.status(400).send('Unexpected field');
//       } else if (err) {
//         return res.status(500).send('Error uploading file');
//       }
  
//       const { pocName, ...rest } = req.body;
  
//       if (!pocName) {
//         return res.status(400).send('POC name is required');
//       }
  
//       const data = {
//         pocName: pocName,
//         ...rest,
//       };
  
//       if (req.file) {
//         data.imageURL = `/static/${req.file.filename}`;
//       }
  
//       const newData = new Data(data);
  
//       newData.save()
//         .then(() => res.status(201).send('Data saved'))
//         .catch(err => res.status(500).send('Error saving data'));
//     });
//   });

// // to add new record
// // const data = new Data({
// //     pocName: "FJM",
// //         name: "hiiii",
// //         image: "jhjjjj",
// //         value: 67
// // })
// // data.save()

// // to delete all record for that POC
// // Data.deleteMany({ pocName: 'FJM' }).then(res => console.log(res)).catch(err => console.log(err));

// const port = process.env.PORT || 2700;
// app.listen(port, ()=> console.log(`listening on port ${port}`));


const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const path = require('path');

mongoose.connect('mongodb://localhost/viPoc', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));

const app = express();
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

const dataSchema = new mongoose.Schema({
  pocName: {
    type: String,
    required: true,
  },
  dateOfInsertion: {
    type: Date,
    default: Date.now,
  },
  imageURL: {
    type: String,
  },
}, { strict: false });

const Data = mongoose.model("Data", dataSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'static'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/upload', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error(err); 
      if (err instanceof multer.MulterError) {
        return res.status(400).send('Multer error: ' + err.message);
      } else {
        return res.status(500).send('Error uploading file');
      }
    }

    const { pocName, ...rest } = req.body;

    if (!pocName) {
      return res.status(400).send('POC name is required');
    }

    const data = {
      pocName: pocName,
      ...rest,
    };

    if (req.file) {
      data.imageURL = `/static/${req.file.filename}`;
    }

    const newData = new Data(data);

    newData.save()
      .then(() => res.status(201).send('Data saved'))
      .catch(err => res.status(500).send('Error saving data'));
  });
});

const port = process.env.PORT || 2700;
app.listen(port, () => console.log(`Listening on port ${port}`));
