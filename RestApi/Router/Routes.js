import express from 'express';
import User from '../Modle/UserSchema.js';

const Routes = express.Router();

//add data 

Routes.post('/register', async (req, res) => {
    try {
        const { name, email, number, password } = req.body;
        if (!name || !email || !number || !password) {
            return res.send("all field are mendetery");
        }else{

            const data =  new User({
                name:req.body.name,
                email:req.body.email,
                number:req.body.number,
                password:req.body.password,
            })
            const check =await User.findOne({email:email});
            if(!check){
               await data.save();
               return res.send("data added successfully");
            }else{
                return res.json({"mass:":"data exist"});
            }
        }

    } catch (error) {
        console.log("problem in register part");
    }
})

//delete data

Routes.delete('/datadelete',async(req,res)=>{
    try {
        
        const findemail = await User.findOne({email:req.body.email});
        if(findemail){

            await User.findOneAndDelete({email:req.body.email});
            return res.json({"User deleted": findemail});
        }else{
            res.send("User not found");
        }
    } catch (error) {
        console.log("problem in delete part");
        
    }
})

//update using patch

Routes.patch('/dataupdate', async (req,res)=>{
    try {
        const {email} = req.body;
        const findemail = await User.findOne({email});
        if(findemail){

            await User.findOneAndUpdate({ email }, req.body, { new: true });
            return res.json({"User updated": findemail});
        }else{
            res.send("User not found");
        }
        
    } catch (error) {
        console.log("problem in updata part");
        
    }
})

// read data

Routes.get('/allname',async (req,res)=>{
    try {
        
        const find = await User.find({});
       
        res.send(find.map((user,i)=>user.name));
    } catch (error) {
        console.log("problem in data part");
    }
})


Routes.get('/alldata',async (req,res)=>{
    try {
        
        const find = await User.find({});
       
        res.send(find);
    } catch (error) {
        console.log("problem in data part");
        
    }
})


export default Routes;

