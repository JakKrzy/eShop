const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config()


app.get("/", (req, res) =>{
    res.send('App is running');
})

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`Server is listening on port ${PORT || 3000}`);
})
