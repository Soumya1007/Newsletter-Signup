const express=require("express");
const bodyparser=require("body-parser");
const request = require("request");
const https = require("https");
const app=express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
    res.sendFile(__dirname+ "/signup.html");
});

app.post("/",function(req,res)
{
   const firstname=req.body.fName;
   const secondname=req.body.sName;
   const email=req.body.email;
   
   const data={
    members:
    [
       { email_address:email,
        status:"subscribed",
        merge_fields:{
            FNAME:firstname,
            LNAME:secondname
        }}
    ]
   };

const jsondata=JSON.stringify(data);
const url="https://us21.api.mailchimp.com/3.0/lists/77d0e648fb";
const options={
    method: "POST",
    auth:"soumya1:39c07f9a8ae6eada2a6b2a12f7fec875-us21"
}
 const request=https.request(url,options,function(response)
{
    if(response.statusCode===200)
    {
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
response.on("data",function(data)
{
    console.log(JSON.parse(data));
});
});
request.write(jsondata);
request.end();
});

app.post("/failure",function(req,res)
{
    res.redirect("/");
})
app.listen(process.env.PORT|| 3000,function()
{
console.log("server is running on port 3000");
});
//apikey
// 39c07f9a8ae6eada2a6b2a12f7fec875-us21
//unique id
// 77d0e648fb