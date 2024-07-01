import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const newUser = new mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    number: {
        require: true,
        type: Number
    },
    messages: [
        {
            name: {
                type: String,
                require: true,
            },
            message: {
                type: String,
                require: true,
            },
        }
    ]
}, { timestamps: true })

// hashing users password
newUser.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const round = 10;
            this.password = await bcrypt.hash(this.password, round);
        }
        next();

    } catch (error) {
        console.log(`error in before becrypt password :: ${error}`)
    }
})


newUser.methods.addMessages = async function (name, message) {
    try {
        this.messages = await this.messages.concat({ name, message })
        await this.save();
        return this.messages;

    } catch (error) {
        console.log(`token dosenot maggage plase check error :: ${error}`);
    }
}
const User = mongoose.model("newdata", newUser);

export default User;