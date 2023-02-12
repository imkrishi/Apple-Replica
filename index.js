var mongoose=require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017")
.then(()=> console.log ("Db connected Successfully"))
.catch((err)=>console.log(err));

const UserSchema = {
    username: {
        type: String, required: true, index:true
    },
    email:{
        type:String, required: true 
    },
    password:{
        type:String, required: true   
    }
    
    
}
const user = mongoose.model("user", UserSchema);

app.get('/signup',function(req,res){
    res.sendFile(__dirname+"/signup.html");
 })

 app.get('/ipad',function(req,res){
    res.sendFile(__dirname+"/ipad.html");
 })

 app.get('/',function(req,res){
    res.sendFile(__dirname+"/WPS.html");
 })

 app.get('/login',function(req,res){
    res.sendFile(__dirname+"/login.html");
 })

 app.post("/signup",(req, res)=>{
    const newuser = new user({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
        
    });
    newuser.save();
    res.redirect("/login");

})


app.post('/login', async(req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await user.findOne({email:email});
       if (useremail.password === password) {
        res.status(201).sendFile(__dirname+"/WPS.html");
        //res.send((alert(`WELCOME ${useremail.username}`)));
       } else {
        res.send("Invalid Password");
       }
    } catch (error) {
        res.status(400).send("invalid Email")
    }
})


app.listen(3000,function(){
    console.log("Server is Listening at 3000");
})




