import express from 'express';
import { Registeruser, Message, Alluser, Donegetting, getallMessage } from '../Controller/Routes.js'
const router = express.Router()

router.route("/signup").post(Registeruser);
router.route("/message").post(Message);
router.route("/alluser").get(Alluser);
router.route("/getallmessage/:email").get(getallMessage);
router.route("/done").get(Donegetting)

export default router;