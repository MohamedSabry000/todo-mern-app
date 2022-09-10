const jwt = require('jsonwebtoken');
const { compare } = require('bcryptjs')
const { catchAsync } = require('../utils/utils')
const User = require('../models/User');

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
        const { name, email, password } = req.body;
        // find email
        const user = await User.findOne({email});
        // match
        if(user) res.json({status: 'failure', message: 'Email already exists'})
        const newUser = await User.create({name, email, password});
        const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET , {
            expiresIn: '90d'
        })

        console.log(`Token: ${token}`);

        res.json({status: 'scuccess', token})
    }),
    authenticated: (req, res, next) => {
        try{
            const token = req.headers.autherization.split(' ')[1];

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