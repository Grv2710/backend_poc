// // // const mongoose = require('mongoose');
// // // const express = require('express');
// // // const home = require('./routes/home');
// // // const datas = require('./routes/data')

// // // const mongoURI = process.env.MONGO_URI || "mongodb+srv://onixevo27:19Lcm5dRsZXh1eIC@cluster0.fs43oks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// // // mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> console.log('connected to db')).catch(err => console.log(err));

// // // const app = express();
// // // app.use(express.static('public'))
// // // app.use(express.json());
// // // app.use('/api/',home);
// // // app.use('/api/data',datas);


// // // const port = process.env.PORT || 2700;
// // // app.listen(port, ()=> console.log(`listening on port ${port}`));


// // const mongoose = require('mongoose');
// // const express = require('express');
// // const home = require('./routes/home');   // adjust path (because now inside /api folder)
// // const datas = require('./routes/data');

// // const app = express();

// // // MongoDB Atlas connection
// // const mongoURI = process.env.MONGO_URI || "mongodb+srv://onixevo27:19Lcm5dRsZXh1eIC@cluster0.fs43oks.mongodb.net/v3?retryWrites=true&w=majority&appName=Cluster0";
// // mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => console.log('✅ Connected to MongoDB Atlas'))
// //   .catch(err => console.error('❌ MongoDB connection error:', err));

// // app.use(express.json());
// // app.use('/', home);
// // app.use('/api/data', datas);

// // // ❌ DO NOT use app.listen in Vercel
// // // ✅ Instead export the app as a module
// // module.exports = app;


// // // const mongoose = require('mongoose');
// // // const express = require('express');
// // // const home = require('../routes/home');   // adjust path
// // // const datas = require('../routes/data');

// // // const app = express();

// // // // MongoDB Atlas connection
// // // const mongoURI = process.env.MONGO_URI || "mongodb+srv://onixevo27:19Lcm5dRsZXh1eIC@cluster0.fs43oks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// // // mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
// // //   .then(() => console.log('✅ Connected to MongoDB Atlas'))
// // //   .catch(err => console.error('❌ MongoDB connection error:', err));

// // // app.use(express.json());
// // // app.use('/', home);       // root → https://.../api/
// // // app.use('/data', datas);  // → https://.../api/data

// // // // Export handler for Vercel
// // // module.exports = app;



// const mongoose = require('mongoose');
// const express = require('express');
// const home = require('./routes/home');
// const datas = require('./routes/data');
// const cors = require('cors'); 
// app.use(cors());
// const app = express();

// // MongoDB Atlas connection
// const mongoURI = process.env.MONGO_URI || 
//   "mongodb+srv://onixevo27:19Lcm5dRsZXh1eIC@cluster0.fs43oks.mongodb.net/v3?retryWrites=true&w=majority&appName=Cluster0";

// mongoose.connect(mongoURI)
//   .then(() => console.log('✅ Connected to MongoDB Atlas'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));

// app.use(express.json());
// app.use('/', home);
// app.use('/api/data', datas);

// // ✅ On Render, you must listen on PORT
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors'); 

const home = require('./routes/home');
const datas = require('./routes/data');

const app = express();

// ✅ Apply middlewares
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
const mongoURI = process.env.MONGO_URI || 
  "mongodb+srv://onixevo27:19Lcm5dRsZXh1eIC@cluster0.fs43oks.mongodb.net/v3?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/', home);
app.use('/api/data', datas);

// ✅ On Render, listen on PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
