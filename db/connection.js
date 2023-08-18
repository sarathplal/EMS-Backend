const mongoose=require('mongoose')
const connectionString=process.env.DATABASE

mongoose.connect(connectionString,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("MongoDB Atlas Connected Sucessfully..");
}).catch((err)=>{
    console.log(`MongoDB Connection Failed :${err}`);
})