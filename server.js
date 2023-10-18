const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


mongoose.pluralize(null)

dotenv.config({path:'./config.env'});


const port = process.env.PORT;
const db = process.env.DB;

// mongoose.connect(db).then(()=>{
//     console.log('database is connected');
// }).catch(()=>{
//     console.log('database base not connected');
// })


const schema = new mongoose.Schema({
    name:{
        type : String,
        required:true,
    },
    email:{
        type : String,
        required:true,
    },
    password:{
        type : String,
        required:true,
    }
})

const allData = mongoose.model('login', schema)



app.post('/register', async (req,res)=>{


    try {
        console.log('here')
        const {name,email,password} = req.body;

        const emailCheck = await allData.findOne({email:email});

        if(emailCheck){
            return res.status(409).send('user already exist');
        }
       const userData = new allData({
        name,email,password
       })
     const user = await userData.save();
    console.log('registraction successfull, login to procees');    
     res.send('registraction successfull, login to procees')

    } catch (error) {
        console.log(error)
    }
    
    
})

app.post('/login',async (req,res)=>{
    try {
        const {email,password}=req.body;
        console.log(req.body)

        const loginCheck = await allData.findOne({email:email})

        if(!loginCheck) return res.status(404).json({message:'user not found'});
        if(password==loginCheck.password){
              res.status(200).json({name:loginCheck.name,message:"Login successfully"})
        }else{
            res.status(404).json({message:"password incorrect,try again"});
        }
    } catch (error) {
         res.status(500).json({message:"internal server error,try again later"});
    }
        
})


app.get('/now',(req,res)=>{
    res.send('checking')
})









mongoose.connect(db).then(()=>{
    console.log('database is connected');

    app.listen(8000,()=>{
    console.log('Port is listening');
})

}).catch(()=>{
    console.log('database base not connected');
})












