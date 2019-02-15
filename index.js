var express=require("express");
var app=express();
//let apiRoutes=require('./routes/api-routes.js');
let mongoose=require("mongoose");

//SETTING UP BODY-PARSER FOR PARSING POST REQUESTS
let bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//CONNECT TO MONGOOSE AND SET UP CONNECTION VARIABLE
mongoose.connect("mongodb://localhost/ranger", { useNewUrlParser: true });
var db=mongoose.connection;
var schema=mongoose.Schema;
var rschema=new schema({
   name:{
      type:String,
      unique:false,
      required:true
   },
   description:{
      type: String,
      unique: false,
      required: true
   }
});
var Ranger=mongoose.model("Ranger",rschema);




app.get("/",(req,res)=>{
   res.send("hello world");
});
app.post("/addpost",(req,res)=>{
   var postData = new Ranger(req.body);
   postData.save().then(()=>{
      console.log("data saving....")
   });
   //res.send(postData);
   res.send(postData);
});

//GET EACH ITEM
app.get("/api/activity",(req,res)=>{
   Ranger.find({}).then((eachOne)=>{
      res.json(eachOne);
   })
});





app.post("/update/:id",(req,res)=>{
   async function updatecourse(id){
      const r=await Ranger.findById(id);
      if(!r) return;
      r.name=req.body.name;
      const res=await r.save();
      console.log(res);
   }



   const t=updatecourse(req.params.id);
   res.send(t);
});

app.listen(4000,()=>{
   console.log("server is running on port...");
});