const mongoose = require("mongoose");

mongoose.set('strictQuery', false); // consolde uyarı vermişti oradan kopyaladım yapıştırdım
const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("MongoDb connection succesful.");
    }).catch(err => {
        console.log(err);
    })
}

module.exports = connectDatabase;