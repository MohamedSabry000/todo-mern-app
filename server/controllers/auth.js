const jwt = require('jsonwebtoken');
const { compare } = require('bcryptjs')
const { catchAsync } = require('../utils/utils')
const User = require('../models/User');
const Token = require("../models/Token");
const sendEmail = require('../utils/email');
// const crypto = import("crypto");


module.exports = {
    login: catchAsync(async (req, res) => {
        const { email, password } = req.body;
        // find email
        const user = await User.findOne({email});
        // match
        if(!user || !(await compare(password, user.password))) res.json({status: 'failure', message: 'Invalid Email or Password'})
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET , {
            expiresIn: '90d'
        })

        console.log(`Token: ${token}`);

        res.json({status: 'scuccess', token})
    }),
    signup: catchAsync(async (req, res) => {
        try {
            const { name, email, password } = req.body;
            // find email
            const user = await User.findOne({email});
            // match
            if(user) res.json({status: 'failure', message: 'Email already exists'})
            const newUser = await User.create({name, email, password});
            const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET , {
                expiresIn: '90d'
            })

            const tokenn = await new Token({
                userId: user._id,
                // token: crypto.randomBytes(32).toString("hex"),
                token: token,
            }).save();

            const message = `${process.env.BASE_URL}/user/verify/${user._id}/${tokenn.token}`;
            await sendEmail(user.email, "Verify Email", message);

            // res.send("An Email sent to your account please verify");

            console.log(`Token: ${tokenn}`);

            res.json({status: 'scuccess', token})
        } catch (error) {
            res.status(400).send("An error occured");
        }
    }),
    verify: catchAsync(async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findOne({ _id:id });
            if (!user) return res.status(400).send("Invalid link");

            const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
            });
            if (!token) return res.status(400).send("Invalid link");

            await User.updateOne({ _id: user._id, verified: true });
            await Token.findByIdAndRemove(token._id);

            // res.send("email verified sucessfully");
            res.json({status: 'scuccess', token})
        } catch (error) {
            res.status(400).send("An error occured");
        }
    }),
    authenticated: (req, res, next) => {
        try{
            console.log(req.headers)
            const token = req.headers.authorization.split(' ')[1];

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            const { id } = decodedToken;
            req.userId = id;
            return next();
        } catch(error){
            res.json({
                status: 'failure',
                message: 'You are not Authenticated'
            })
        }
    }
}