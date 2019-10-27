const express = require('express');
require('./db/mongoose');
const userRoute = require('./routes/user');
const petRoute = require('./routes/pets');

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json({ extended: false }));

//registreramo nov rauter
app.use(userRoute);
app.use(petRoute);

app.listen(port, () => {
  console.log('Poslisam na port ' + port);
});
