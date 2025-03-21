"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: String,
    email: String,
    password: String,
    team: String,
    cart: []
    // cart : [{type:mongoose.Schema.Types.ObjectId , ref: "Product" }]
});
// const productSchema = new mongoose.Schema({
//     id : Number , 
//     img1 : String , 
//     img2 : String , 
//     img3 : String , 
//     productName : String , 
//     price : String , 
// })
exports.User = mongoose_1.default.model('User', userSchema);
// export const Product = mongoose.model('Product' , productSchema) ;
