import mongoose from 'mongoose'
import mongodb from 'mongodb'
var Schema = mongoose.Schema

// create a schema
var productSchema = new Schema({
  title: String,
  description: String,
  imgUrl: String,
  prize: String,
  userId: { type: Schema.ObjectId, ref: 'User' }
},{
  timestamps: true
})

//Make Product Modal
const Product = mongoose.model('Product', productSchema)

export default Product

