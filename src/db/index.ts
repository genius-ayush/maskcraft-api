import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username : String , 
    email : String , 
    password : String ,
    team : String , 
    cart : []
    // cart : [{type:mongoose.Schema.Types.ObjectId , ref: "Product" }]
})

// const productSchema = new mongoose.Schema({
//     id : Number , 
//     img1 : String , 
//     img2 : String , 
//     img3 : String , 
//     productName : String , 
//     price : String , 

// })

export const User = mongoose.model('User' , userSchema) ; 
// export const Product = mongoose.model('Product' , productSchema) ;

