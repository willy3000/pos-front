const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(express.json())

var cors = require('cors')

app.use(cors())
app.use(bodyParser.json());



//Authentication
app.use('/api/auth', require('./auth'))



//Projects Api
app.use('/api/projects', require('./projects'))


// //products Api
// app.use('/api/products', require('./routes/api/products'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started  on port ${PORT}`))