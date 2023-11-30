const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
// allow cross-origin requests
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Connect to MongoDB
const MONGO_URI = 'mongodb://0.0.0.0:27017/nftdb';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const combinedRoutes = require('./routes/routes');

app.use('/', combinedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();
// const cors = require('cors'); // Import the cors package

// const app = express();
// app.use(cors({
//   origin: 'http://localhost:3001', // Specify the origin(s) from which you want to allow requests
//   methods: ['GET', 'POST', 'DELETE'], // Specify the HTTP methods you want to allow
// }));

// // Connect to MongoDB Atlas
// // Replace the placeholder values with your actual MongoDB Atlas credentials
// // Connect to MongoDB Atlas using environment variables
// const { MONGO_USER } = process.env;
// const { MONGO_PASSWORD } = process.env;
// const { MONGO_CLUSTER } = process.env;
// const { MONGO_DATABASE } = process.env;
// const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;

// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB Atlas');
// });

// app.use(express.json());

// // Routes
// const nftRoutes = require('./routes/routes');

// app.use('/nfts', nftRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
