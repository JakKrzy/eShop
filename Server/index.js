const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();


const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB)
.then(() => console.log("Succesfully connected to DB"))
.then((err) => {err;})

// app.get("/", (req, res) =>{
//     res.send('App is running');
// })

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`Server is listening on port ${PORT || 3000}`);
})
