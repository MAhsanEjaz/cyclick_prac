const express = require('express');

const userModel = require('../model/user_model');

const app = express();


app.post('/postData', async (req, res) => {
    try {
        const { userName } = req.body;
        const data = new userModel({
            userName: userName
        });

        await data.save();

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


app.get('/getUser',async(req, res)=>{

const  data = await userModel.find();

res.json(data);


})
app.get('/getUserID/:id',async(req, res)=>{

    const {id} = req.params;

    const  data = await userModel.findById(id);
    
    res.json(data);
    
    
    })

module.exports = app;

