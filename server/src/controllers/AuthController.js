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

export default {
    userRegistration, 
}