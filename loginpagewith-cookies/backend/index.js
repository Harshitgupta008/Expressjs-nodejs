import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express();

const port = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(cookieParser())
const Db = process.env.MONGO_URL;
mongoose.connect(Db).then(() => {
    console.log("success in mongoose part")
}).catch((error) => {
    console.log("problm in mongoose part :: " + error)

})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phonenumber: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    corrpassword: {
        type: String,
        require: true,
    },
    // token are added here
    tokens: [
        {
            token: {
                type: String,
                require: true,
            }
        }
    ],
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        this.corrpassword = await bcrypt.hash(this.corrpassword, 10);
    }
    next();
})

// we createed tokens are here
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECREATE_KEY);
}
const user = mongoose.model("correctform", userSchema);

// **********************************************************register start here********************* 
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, phonenumber, password, corrpassword } = req.body;
        if (!name || !email || !phonenumber || !password || !corrpassword) {
            return res.send("all fillie are required");
        }
        const data = new user({
            name: req.body.name,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            password: req.body.password,
            corrpassword: req.body.corrpassword,
        })


        const check = await user.findOne({ email: email })
        if (!check) {
            if (password === corrpassword) {

                const done = await data.save();

                res.send("data added successfully");
            } else {
                return res.send("password didn't  match");

            }
        } else {
            return res.status(422).send("data are already exist")
        }


    } catch (error) {
        console.log("error in register part :: " + error)
    }

})

// **********************************************************login start here********************* 
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send("all fillie are required");
        }

        const checkuser = await user.findOne({ email });
        //bcrypted data compare
        if (!checkuser) {

            return res.status(400).json({ "massage": "User not find" })
        } else {
            const ismatch = await bcrypt.compare(password, checkuser.password);



            // console.log(`our token cookie are :: ${req.cookies.jwt}`);

            if (!ismatch) {
                return res.status(400).json({ "massage": "User not find" })
            } else {
                const payload = { _id: checkuser._id, name: checkuser.name, email: checkuser.email, phonenumber: checkuser.phonenumber };

                // Generate JWT token
                const token = generateToken(payload);

                // Set JWT token as a cookie
                
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 5*24*60*60*1000),
                    httpOnly: true
                });
                return res.status(200).send("login successfully")

            }

        }

    } catch (error) {
        console.log("error in login part :: " + error)
    }

})


//***************************************************************find user login or not *************************

//  create middleware 

const auth = async (req, res, next) => {
    try {

        const token = req.cookies.jwtoken; // Extract token from cookies
        if (!token) {
            return res.status(401).send('Unauthorized');
        }

        // Verify token and decode user information
        const decoded = jwt.verify(token, process.env.SECREATE_KEY); 
        req.user = decoded; // Assign decoded user information to req.user
        next();
    } catch (error) {
        console.log("error:", error);
        return res.status(401).send('Unauthorized');
    }
}

app.get('/api/about', auth, (req, res) => {
    res.send(req.user);

})
app.get('/api/contact',auth, async (req,res)=>{
    const users = await user.find({});
    
    res.send(users)
})

app.get('/log/:name', async (req, res) => {
    try {
        // find indvisual
        const names =  req.params.name;
        const users = await user.find({name:names}); // Fetch all users from the database
        res.send(users);

        // // find all
        // const users = await user.find({});
        // res.send(users)
    } catch (error) {
        console.log("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



app.listen(port, () => {
    console.log(`done express part at port :: ${port}`)
})