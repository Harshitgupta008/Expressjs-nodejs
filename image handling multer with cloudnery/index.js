import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const db = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
// mongoose connect 

mongoose.connect(db).then(() => {
    console.log("done data part");
}).catch((error) => {
    console.log(`error in data part :: ${error}`);
})

//create schema
const UserShema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    imageDp: {
        data: Buffer,
        type: String
    },
    place: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
}, { timeStamp: true });

// bcrypt our password 
UserShema.pre('save', async function (next) {
    if (isModified('password')) {
        this.password = await bcrypt.hash(this.password, process.env.BCRYPT_ROUND);
    }
    next();
})

const User = mongoose.modle("newdatabyharshit", UserShema);

// Generate token for authentication user
const GenrateToken = async (payload) => {
    let token = await jwt.sign(payload, process.env.SECREATE_TOKEN_KEY);
    return token;
}


// image handle threw of multer and cloudinary
cloudinary.config({
    cloud_name: process.env.MULTER_SECREATE_NAME,
    api_key: process.env.MULTER_SECREATE_API_KEY,
    api_secret: process.env.MULTER_SECREATE_API,
});

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

// create user - register form
app.post('/api/register', upload.single("fileUpload"), async (req, res) => {

    const { name, place, email, password } = req.body;
    try {
        if (!name || !req.file || !place || !email || !password) return res.send("all field are mendetory");

        // Upload an image on cloudinary

        const uploadResult = await cloudinary.uploader.upload(req.file.path).catch((error) => { console.log(error) });
        console.log("cloud url " + uploadResult.secure_url);

        // delete our image form 'uploads/' folder after upload cloudinary
        fs.unlink(req.file.path, function (err) {
            if (err) console.log("error in delete fs" + err);
            else {
                console.log("delete file")
            }
        });

        const newUser = new User({
            name: req.body.name,
            imageDp: uploadResult.secure_url,
            place: req.body.place,
            email: req.body.email,
            password: req.body.password,
        });

        const checkUser = await newUser.findOne({ email: email });
        if (checkUser) {
            return res.status(400).send("user already exist");
        } else {
            await newUser.save()
            return res.status(200).send("register successfully");
        }

    } catch (error) {
        console.log(`error in register part :: ${error}`);
    }
})

// Login form
app.post("api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.send("all field are mendetory");

        const emailcheck = await User.findOne({ email: email });
        const pass_check = await bcrypt.compare(password, emailcheck.password);

        if (!emailcheck && !pass_check) {
            return res.status(400).send("check your email and password");
        } else {
            const payload = {
                _id: emailcheck._id,
                name: emailcheck.name,
                imageDp: emailcheck.imageDp,
                place: emailcheck.place,
                email: emailcheck.email,
            }
            const token = GenrateToken(payload);
            res.cookie("harshit_token", token, {
                expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            })
            return res.status(200).send("login successfully");
        }

    } catch (error) {
        console.log(`error in login part :: ${error}`);
    }
})


// authentication middleware
const auth = async (req, res, next) => {
    const check_token = await req.cookie.harshit_token;
    try {
        if (!check_token) return res.status(401).send("token are not genrated");

        const verifytoken = await jwt.verify(check_token, process.env.SECREATE_TOKEN_KEY);
        if (!verifytoken) {
            console.log("token are not verofy")
            return res.status(400).send("token are not verfyed")
        }

        req.genuser = verifytoken;
        next();
    } catch (error) {
        console.log(`error in finding token part :: ${error}`);
    }


}

// delete token

const logout = async (req, res, next) => {
    res.clearCookie("harshit_token");
    res.redirect("/");
    next();
};

// send detail in about page 😊

app.get('/api/about', auth, async (req, res) => {

    res.send(req.genuser);
})
app.get('/api/logout', logout, async (req, res) => {

    res.status(200).send("logout done");
})




app.listen(port, () => {
    console.log("done express part")
})
