const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { initDb } = require('./utils/db');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
app.use('/', routes);

app.use(bodyParser.json());

initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(3000, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});

