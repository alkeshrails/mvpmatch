import Bcrypt from 'bcryptjs'
import _ from 'lodash'

import Product from '../models_mongo/Product'
import User from '../models_mongo/User'
import DepositAmount from '../models_mongo/depositAmount'
import Helper from '../utils/helpers'

const addProduct = async (req, res) => {
    try {
        let body =  req.body ;
        const userDetail = Helper.getMe(req.headers['x-access-token']);
        body.userId = userDetail._id
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
        const tickets = await Product.deleteOne(
            { _id: req.query._id }
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
        const userDetail = Helper.getMe(req.headers['x-access-token']);

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

const getProductsById = async (req, res) => {
    try{
        const userDetail = Helper.getMe(req.headers['x-access-token']);
        const products = await Product.find({userId: userDetail._id, userType: userDetail.userType})
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
        const userDepositedAmount = await User.findOne({_id: userDetail._id});
        let totalAmount = userDepositedAmount.amount ? userDepositedAmount.amount : 0;
        if(totalAmount && totalAmount >= req.body.amount) {
            const remainingAmount = totalAmount - req.body.amount;
            const user = await User.update({_id: userDetail._id},{$set:{remainingAmount: remainingAmount, amount: remainingAmount}, $push: {productIds: req.body.productIds}})
            return res.status(200).send({
                status: true,
                message: "Product purchased.",
            }) 
        }else {
            return res.status(200).send({
                status: true,
                message: "you have not sufficient amount",
            }) 
        }
    }catch(error) {
        return res.status(200).send({
            status: false,
            message: error.message,
            data: []
        })
    }
}

const depositAmount = async(req, res) => {
    try {
        const userDetail = Helper.getMe(req.headers['x-access-token']);
        const userAmount = await User.findOne({_id: userDetail._id});
        let totalAmount = req.body.amount + (userAmount.amount ? userAmount.amount : 0);
        const deposit = await User.update({_id: userDetail._id},{$set: {amount: totalAmount, remainingAmount: totalAmount}})
        return res.status(200).send({
            status: true,
            message: "Deposit amount .",
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
    getProductsById,
    depositAmount
}