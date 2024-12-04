import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectId = JoiObjectId(Joi);

export const signupValidation = (req,res,next)=>{

    const schema = Joi.object({
        name : Joi.string().min(3).max(100).required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(4).max(100).required()
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400)
        .json({messee:"Bad Request",error})
    }
    next();
}

export const loginValidation = (req,res,next)=>{

    const schema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().min(4).max(100).required()
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400)
        .json({messee:"Bad Request",error})
    }
    next();
}

export const addProductValidation = (req,res,next)=>{

    const schema = Joi.object({
        jwtToken:Joi.string().required(),
        email:Joi.string().required(),
        product:Joi.object({
        id:Joi.number().required(),
        title:Joi.string().required(),
        price:Joi.number().required(),
        description:Joi.string().required(),
        category:Joi.string().required(),
        image:Joi.string().required(),
        rating:Joi.number().required(),
        userId: Joi.objectId().required(),
       })
    })

    const {error}=schema.validate(req.body)
    if(error){
        return res.status(400)
        .json({message:"Bad Request",error})
    }
    next()
}

export const updateProductValidation = (req,res,next)=>{

    const schema = Joi.object({
        jwtToken:Joi.string().required(),
        email:Joi.string().required(),
        product:Joi.object({
        _id:Joi.string().required(),
        id:Joi.number().required(),
        title:Joi.string().required(),
        price:Joi.number().required(),
        description:Joi.string().required(),
        category:Joi.string().required(),
        image:Joi.string().required(),
        rating:Joi.number().required(),
        userId: Joi.objectId().required(),
       })
    })
    const {error}=schema.validate(req.body)
    if(error){
        return res.status(400)
        .json({message:"Bad Request",error})
    }
    next()
}

export const deleteProductValidation = (req,res,next)=>{

    const schema = Joi.object({
        _id:Joi.objectId().required()
    })

    const {error}=schema.validate(req.body)
    if(error){
        return res.status(400)
        .json({messege:"Bad Request",error})
    }
    next()

}

export const findProductValidation = (req,res,next)=>{

    const schema = Joi.object({
        _id:Joi.objectId().required()
    })

    const {error}=schema.validate(req.params)
    if(error){
        return res.status(400)
        .json({messege:"Bad Request",error})
    }
    next()
}