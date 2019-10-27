const mongoose = require('mongoose');

const MONGODB_URL =
  process.env.MONGODB_URL ||
  'mongodb://domen:domenlisjak123@ds137368.mlab.com:37368/pet-manager';

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
