const express = require('express');
const app = express();
const authRouter = require('./Routers/authRouter');

const cors = require('cors')
require('./Models/DBConnection')

app.use(cors());
app.listen(process.env.PORT || 4000);
app.use(express.json())
app.use('/auth', authRouter);