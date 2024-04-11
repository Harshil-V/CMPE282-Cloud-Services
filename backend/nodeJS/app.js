const express = require('express');
const app = express();



require('dotenv').config();
const cors = require('cors');
const router = require('./routes/router');

app.use(cors());
app.use('/', router);



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});