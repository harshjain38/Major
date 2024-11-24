require("dotenv").config({ path: './config.env' });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

try {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
        .then(() => console.log("Connection Successful!"));
}
catch (err) {
    console.log(err);
}

const companyController = require("./Controllers/companyController");
const getCompanies = require("./Controllers/getCompany");
const getProducts = require("./Controllers/getProduct");

app.get('/', (req, res) => {
    res.send('Backend Server is running... 👌✨');
});

app.get("/getCompanies", getCompanies.getAllCompanies);
app.post("/getProducts", getProducts.getAllProducts);

app.post("/verify", companyController.companyVerification);
app.post("/login", companyController.login);
app.post("/register", companyController.register);

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));