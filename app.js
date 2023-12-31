const express = require('express');
const app = express();
const Name = require("./models/nameModel");
const mongoose = require('mongoose');
const port = 3000;
const cors = require("cors");
const dotenv = require("dotenv");



dotenv.config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //FOR FORM DATA INPUTS

// CREATING A NAME IN THE DATABASE
app.post('/api', async(req, res) => {
    try {
        const name = await Name.create(req.body)
        res.status(200).json({
            message: "User created successfully",
            name
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});



// GETTING ALL Name IN THE DATABASE OR READ OPERATION
app.get('/api', async(req, res) => {
    try {
        const name = await Name.find({});
        res.status(200).json(name);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


// * NO QUERY PARAMETER ONLY PATH PARAMETER HERE (REMOVED QUERY PARAMETER ON THE ID)

// GETTING A SPECIFIC USER IN THE DATABASE OR READ OPERATION
app.get('/api/:user_id', async(req, res) => {
    try {
        // GETTING ID FROM THE PARAMETERS
        const {user_id} = req.params;
        const name = await Name.findById({_id: user_id});
        res.status(200).json(name);
    } catch (error) {// CREATING A NAME IN THE DATABASE
app.post('/api', async(req, res) => {
    try {
        const name = await Name.create(req.body)
        res.status(200).json({
            message: "User created successfully",
            name
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});


        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});


// UPDATE THE Name IN THE DATABASE OR UPDATE OPERATION
app.put('/api/:user_id', async(req, res) => {
    try {
        const {user_id} = req.params;
        const name = await Name.findByIdAndUpdate({_id: user_id}, req.body);
        // Name Update Validation
        if(!name){
            return res.status(404).json({message: `We cannot find name with the ID ${user_id}`});
        }
        const updatedName = await Name.findById(user_id);
        res.status(200).json({
            message: `successfully updated the name with the ID ${user_id}`,
            updatedName
        });
    } catch (error) {
        res.json(500).json({message: error.message});
    }
});


// DELETING A NAME FROM THE DATABASE OR DELETE OPERATION
app.delete('/api/:user_id', async(req, res) => {
    try {
        // GETTING ID FROM THE PARAMETERS
        const {user_id} = req.params;
        const name = await Name.findByIdAndDelete({_id: user_id});
        if(!name){
            return res.status(404).json({message: `We cannot find name with the ID ${user_id}`});
        }

        res.status(200).json({
            message: `successfully deleted the name with the ID ${user_id}`,
            name
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});


// MongoDB CONNECTION
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Sever listing at port ${port}`)
    });
  })
  .catch((err) => {
    console.log(err);
  });




