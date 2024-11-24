const Product = require("../Models/productModel.js");

exports.getAllProducts = async(req,res)=>{
    const {companyName} = req.body;

    await Product.find({companyName}, (err,data)=>{
        if (err) {
            console.error('Error fetching products data: ', err);
            res.send({ message: "Error fetching products data!" });
        } 
        else{
            console.log('All Products: ', data);
            res.send({Products: data});
        }
    });
};