const express = require('express');
const cors = require('cors')
const path = require('path');

const app = express();
app.use(cors);
app.use(express.static(path.join(__dirname, '/dist')))
const port = process.env.PORT || 8000;
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'))
})
 
app.listen(port);
