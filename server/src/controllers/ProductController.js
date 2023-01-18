import Bcrypt from 'bcryptjs'
import _ from 'lodash'

import Product from '../models_mongo/Product'
import User from '../models_mongo/User'
import Helper from '../utils/helpers'

const addProduct = async (req, res) => {
    try {
        let body =  req.body ;
        let product = await Product.findOne({ title: body.title })
        if (!product) {
            product = await Product.create(body)
            return res.status(200).json({
                status: true,
                message: "Product created successfully.",
                data: product
            })
        } else {
            return res.status(200).json({
                status: false,
                message: "Product already exists !!!",
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

const updateProduct = async (req, res) => {
    try {    
        await Product.update({
           _id:req.body._id
        },{$set:req.body})
        return res.status(200).send({
            status: true,
            message: "Product Updated.",
        })  
    } catch(error) {
        return res.status(200).send({
            status: false,
            message: error.message,
            data: []
        })
    }
}

const deleteProduct = async (req, res) => {     
    try {
        const tickets = await Product.remove(
            { _id: req.body._id }
        )      
        return res.status(200).json({
            status: true,
            message: "Product deleted successfully.",
            data: tickets
        })
        }catch(error) {
            return res.status(200).send({
                status: false,
                message: error.message,
                data: []
            })
        }
}

const getProducts = async (req, res) => {   
    try{
        const products = await Product.find({})
        return res.status(200).json({
            status: true,
            message: "Product fetched successfully.",
            data: products,
        })
    }catch (error) {
        return res.status(200).send({
            status: false,
            message: error.message,
            data: []
        })
    }
}

const purchaseProduct =  async (req, res) => {
    try {
        const userDetail = Helper.getMe(req.headers['x-access-token']);
        const user = await User.update({_id: userDetail._id},{$push: {productIds: req.body.productIds}})
        return res.status(200).send({
            status: true,
            message: "Product purchased.",
        }) 
    }catch(error) {
        return res.status(200).send({
            status: false,
            message: error.message,
            data: []
        })
    }
}

export default {
    addProduct,
    updateProduct,
    getProducts,
    deleteProduct,
    purchaseProduct,
}