// server.js
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.type('text').send('Weston Davis'); // replace with any name you want
});
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
