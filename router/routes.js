const express = require('express');

const userModel = require('../model/user_model');

const imageModel = require('../model/image_model');

const multer = require('multer');

const app = express();


app.use(express.static('uploads'));


const storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
     cb(null, Date.now() + '-' + file.originalname);
    }
    })
    
    const upload = multer({
      storage:storage
    });


    
    app.post('/file',upload.single('myImage'),async(req,res)=>{


        const {name} = req.body;
        const image = req.file.filename;
        const data = imageModel({
            name:name,
            image:image});
       await data.save();
        res.json(data);
    });


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

