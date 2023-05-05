const userModel = require('../Models/userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {JWT_SECRET_KEY} = require("../helpers/env") 


async function signUpUser(req, res) {
    try{
        let userData = req.body;
    
        let user = await  userModel.findOne({userEmail: userData.userEmail});

        if(user) {
            return res.status(400).json({
                message: "User already exists...",
                status: false
            })
        }

       userData.userPassword = await bcrypt.hash(userData.userPassword, 10);
        let newUser = await userModel.create(userData);

        const payload = {
            _id: newUser._id,
            name: req.body.userName
        }

        jwt.sign({user: payload}, JWT_SECRET_KEY, (err, token) => {
            if(err) return res.status(400).json({message: err.message, status: false});
            else {
                return res.json({
                    message: "User created successfully",
                    token,
                    user: payload,
                    status: true
                })
            }
        })
    } catch(error) {
        res.status(500).json({ message: error.message, status: false });
    }
}


async function loginUser(req, res) {
    let data = req.body;
    let user = await userModel.findOne({userEmail:data.userEmail});
    
    try{
        if(user) {
            const match = await bcrypt.compare(data.userPassword, user.userPassword);
            if(match) {
                const payload = {
                    _id: user._id,
                    name: user.userName
                }
                jwt.sign({ user: payload }, JWT_SECRET_KEY, (err, token) => {
                    if (err) return res.status(400).json({ message: err.message, status: false });
                    else {
                        return res.json({ token, user: payload, status: true });
                    }
                });
            } else {
                return res.status(400).json({
                    status:false,
                    message: 'Wrong Credentials...'
                })
            }
        } else {
            return res.status(404).json({
                status:false,
                message: 'Email Id not found'
            })
        }
    } catch(err) {
        return res.status(500).json({ message: err.message, status: false });
    }
}

module.exports = {
    loginUser: loginUser,
    signUpUser: signUpUser,
}