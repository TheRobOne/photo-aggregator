const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors);
const port = 4200;

app.listen(port, () => console.log(`App is listening on port ${port}`));