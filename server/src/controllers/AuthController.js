import Bcrypt from 'bcryptjs'
import _ from 'lodash'

import User from '../models_mongo/User'
import Helper from '../utils/helpers'

// User registration and create user account
const userRegistration = async (req, res) => {
  try {
    const body = req.body
    let user = await User.findOne({ mail: body.mail })
    if (!user) {
        const salt = await Bcrypt.genSalt(10)
        body.pass = await Bcrypt.hash(body.pass, salt)
        user = await User.create(body)
        return res.status(200).json({
            status: true,
            message: "User created successfully.",
            data: user
        })
    } else {
        return res.status(200).json({
            status: false,
            message: "User already exists with this email address!!!",
            data: []
        })
    }
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
      data: ''
    })
  }
}

// login with email and password and return token
const userLogin = async (req, res)  => {
    try {
         const body = req.body
        const user = await User.findOne(
            { mail: body.mail },
            { createdAt: 0, updateAt: 0 }
        )
        if (user) {
            const passwordCheck = await Bcrypt.compare(body.pass, user.pass)
            if (passwordCheck) {
                const token = Helper.createJwtAuthToken(user)
                const users = await User.findOne(
                    { _id: user._id }                 
                ).populate('idTypeUser','name')
                return res.status(200).send({
                    status: true,
                    message: "Logged-in successfully.",
                    data: { user: users }
                })
            } else {
                return res.status(200).send({
                    status: false,
                    message: "Wrong Password. Please try again.",
                    data: {}
                })
            }
        } else {
            return res.status(200).send({
                status: false,
                message: "Username not found. Please register.",
                data: {}
            })
        }

    } catch (error) {
        return res.status(200).send({
            status: false,
            message: error.message,
            data: []
        })
    }
}

export default {
    userRegistration, 
    userLogin
}