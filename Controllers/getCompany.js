const Company = require("../Models/companyModel.js");

exports.getAllCompanies = async(req,res) => {
    await Company.find({}, (err,data)=>{
        if (err) {
            console.error('Error fetching companies data: ', err);
            res.send({ message: "Error fetching companies data!" });
        } 
        else{
            console.log('All Companies: ', data);
            res.send({Companies: data});
        }
    });
};