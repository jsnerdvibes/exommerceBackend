import { UserModel,productModel } from "../Models/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {mongoose } from "mongoose"


export const signup = async (req,res)=>{

    try {
        const {name,email,password}=req.body
        const user = await UserModel.findOne({email}) 

        if(user){
            return res.status(409)
            .json({messege:"User Exsist you can login",success:false})
        }
        const userInfo = new UserModel({name,email,password})
        userInfo.password = await bcrypt.hash(password
            ,10)
        await userInfo.save()
        res.status(201).json({messege:"SignUp Successful",success:true}) 
        
    } catch (error) {
        res.status(500).json({messege:"internal Server Error",success:false})  
    }


}

export const login = async (req,res)=>{
    try {
        const {email,password}=req.body
        const user = await UserModel.findOne({email}) 
        const errorMessege = "Auth fail email or Pass is wrong"

        if(!user){
            return res.status(403)
            .json({messege:errorMessege,success:false})
        }
        const isPassCorrect = await bcrypt.compare(password,user.password)
        if(!isPassCorrect){
            return res.status(403)
            .json({messege:errorMessege,success:false})
        }
            const jwtToken = jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET  ,
            {expiresIn:"24h"})
        res.status(200).json({messege:"Login Successful",
                              success:true,
                              jwtToken,
                              email,
                              name:user.name}) 
        
    } catch (error) {
        res.status(500).json({messege:"internal Server Error",success:false})  
    }
}


export const products = async(req,res) =>{

    try {
        const data = await productModel.find({}).select("-userId")
        res.status(200).json(
            {messege:`Data fetched`,
        success:true,
        data}
        )
        
    }catch (error) {
        res.status(500).json(
            {messege:`error: ${error}`,
        success:false}
        )
    }

}

export const listProducts = async (req, res) => {
    try {
        let { userId } = req.params;

        if(userId){
            userId = new mongoose.Types.ObjectId(userId);
        
            const data = await productModel.find({userId})
            
            return res.status(200).json({ message: "success",data});
        }else{
            return res.status(400).json({ message: "Server error",data:[]});
        }

        

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Invalid user Id",data:[] });
    }
};

export const updateProduct = async(req,res)=>{

    try {
        
        const {jwtToken,email,product} = req.body
        const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);

        if(email===decodedToken.email){
            
            const _id = new mongoose.Types.ObjectId(product._id)

            const newProduct = {...product}

            newProduct.userId = new mongoose.Types.ObjectId(newProduct.userId )

            const updateProduct = await productModel.findByIdAndUpdate(_id,{...newProduct},
                {new:true}
            )

            return res.status(200).json({ message: "Product updated successfully", updateProduct });
        }

        return res.status(200).json({ message: "failed if statement"});
    } catch (error) {
        return res.status(500).json({ message: "failed"});
    }   
}

export const addProduct = async (req,res)=>{

    try {

        const {jwtToken,email,product} = req.body
        const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET)

        if(email===decodedToken.email){

            const newProduct = new productModel({...product})

            newProduct.userId = new mongoose.Types.ObjectId(newProduct.userId )

            console.log("new product:",newProduct)

            await newProduct.save()

            return res.status(200).json({ message: "Product added successfully", newProduct});
        }

        
    } catch (error) {
        return res.status(500).json({ message: "failed"});
    }

}


export const deleteProduct=async (req,res)=>{   

    try {

        let {_id }= req.body

        _id = new mongoose.Types.ObjectId(_id)

        const itemToDelete = await productModel.findById(_id)

        if(!itemToDelete){
            res.status(404).json({messege:"Product not found"})
        }

        await productModel.findByIdAndDelete(_id)

        return res.status(200).json({messege:"Item Deleted successfully"})

        


        
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error"});
    }


}


export const findProduct=async (req,res)=>{

    try {
        let {_id}= req.params

        _id = new mongoose.Types.ObjectId(_id)

        const itemDetail = await productModel.findById(_id)

        if(!itemDetail){
            return res.status(404).json({messege:"Product not found"})
        }

        return res.status(200).json({messege:"Product Found",itemDetail})

    } catch (error) {
        
    }
}