import User from "../Modles/Schema.js"

const Registeruser = async (req, res) => {
    const { name, email, password, number } = req.body;

    if (!name || !email || !password || !number) { return res.status(400).send("all field are mendatry") }
    try {

        const data = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            number: req.body.number
        })
        const check = await User.findOne({ email });
        if (!check) {
            const alldata = await data.save();
            console.log("data send properly :: " + alldata);
            return res.status(200).send("data send properly :: " + alldata);
        } else {
            return res.status(400).send("user exist");

        }
    } catch (error) {
        console.log("problem in register part");
    }

}

const Message = async (req, res) => {
    const { name, message, email } = req.body;
    if (!name || !email || !message) { return res.send("all field are mendatry") }
    try {

        const check = await User.findOne({ email });
        if (check) {
            await check.addMessages(name, message);
            return res.status(200).send("send message = " + message)
        } else {
            return res.status(400).send("user not fond = " + message)

        }
    } catch (error) {
        console.log("problem in message part :: " + error);
    }
}

const getallMessage = async (req, res) => {
    const { email } = req.params;
    if (!email) { return res.send("fill mail") }
    try {

        const check = await User.findOne({ email });
        if (check) {
            const allmessage = check.messages.map((ele) => ele.message)

            return res.status(200).json({ "allmessage := ": allmessage });



        } else {

            return res.status(400).send("user not fond this email = " + email)

        }
    } catch (error) {
        console.log("problem in message part :: " + error);
    }
}


const Alluser = async (req, res) => {
    try {
        const alldata = await User.find({});
        return res.status(200).json(alldata);
    } catch (error) {
        console.log("problem in alluser part");
    }
}
const Donegetting = (req, res) => {
    res.send("done bor");
}
export { Registeruser, Message, Alluser, Donegetting, getallMessage };