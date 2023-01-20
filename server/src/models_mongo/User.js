import mongoose from 'mongoose'
import mongodb from 'mongodb'
var Schema = mongoose.Schema

// create a schema
var userSchema = new Schema({
  name: String,
  pass: String,
  mail: String,
  userType: String,
  productIds: [{  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  remainingAmount: Number,
  amount: Number
},{
  timestamps: true
})

//Make user Modal
const User = mongoose.model('User', userSchema)

export default User

