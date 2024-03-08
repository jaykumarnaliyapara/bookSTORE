const cors = require("cors");
const express = require('express')
const dotenv = require('dotenv')
const expressLayout = require('express-ejs-layouts')
const app = express()
const path = require("path")
const collection = require("./db")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtS = "healthstorewelcomesyouhaha"
const monDB = require("./db")
const Order = require("./orders")
const Razorpay=require("razorpay")
const mongoose=require('mongoose')
const crypto=require("crypto")
require("./Routes/paymentRoute")
dotenv.config();
app.use(cors());
app.use(express.urlencoded({extended:true}))
monDB();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use(express.json())
app.use(expressLayout)
app.get("/", cors(), (req, res) => {
  res.send("hello!!this is the first msg!!!!")
})
//user Registration
app.post("/data", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  let sPassword = await bcrypt.hash(req.body.password, salt)
  try {
    const dt = {
      name: req.body.name,
      email: req.body.email,
      password: sPassword,
      location: req.body.location
    }
    const pt = await collection.findOne({ "email": req.body.email })
    console.log(pt)
    if (pt == null) {
      await collection.insertMany([dt])
      console.log(dt)
      res.send({ success: true })

    } else {
      console.log({ "-->user already registered": "false" })
      res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false })
  }
}
)
//Login User
app.post("/lg", async (req, res) => {
  const em = await collection.findOne({ "email": req.body.email })
  if (em == null) {
    res.status(400).json({ success: false })
    console.log("-->E-mail not found!!")
  } else {
    console.log("-->E-mail Found!!")
    const ps = await collection.findOne({ "password": req.body.password })
    const salt = await bcrypt.genSalt(10);
    const pcmp = await bcrypt.compare(req.body.password, em.password)
    const data = {
      user: {
        id: collection.id
      }
    }
    const authT = jwt.sign(data, jwtS)
    if (pcmp == true) {
      res.send({ success: true })
    } else {
      console.log("-->INCORRECT PASSWORD!!")
      res.status(400).json({ success: false }
      )
    }
  }
})
app.post("/vdata", cors(), (req, res) => {
  try {
    res.send([global.fetched_data, global.c_data])
    console.log(global.fetched_data)
  } catch (error) {
    console.log("-->DATA NOT SEND!!", error)
  }
})
//displaying profile data
app.post("/pdata", cors(), async (req, res) => {
  try {
    const gdata = await collection.findOne({ "email": req.body.email })
    if (gdata == null) {
      console.log("-->profile data email not found")
    } else {
      res.send([gdata])
      console.log([gdata])
    }
  } catch (error) {
    console.log("--> profileDATA NOT SEND!!", error)
  }
})
//saving order data
app.post("/odata", async (req, res) => {
  let data = req.body.order_data

  await data.splice(0, { totalPrice: req.body.totalPrice }, { Order_date: req.body.order_date })


  let eId = await Order.findOne({ "email": req.body.email })
  console.log(eId)
  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data]

      }).then(() => {
        res.json({ success: true })
      })
    } catch (error) {
      console.log(error.message)
      res.send({ success: false })
    }
  }
  else {
    try {
      await Order.findOneAndUpdate({ "email": req.body.email },
        { $push: { order_data: data } }).then(() => { res.json({ success: true }) })
    } catch (error) {
      res.send({ success: false })
    }
  }
})
//update-data
app.post("/udata", async (req, res) => {
  try {
    //const {email,location}=req.body;
    //await collection.findOneAndUpdate({"email":req.body.email},{$set:{location:location}})
    const result = await collection.updateOne(
      { email: req.body.email },
      { $set: { location: req.body.location } }
    );
    console.log("-->E-mail found for Location Update:", result)
    res.send({ success: true })
  } catch (error) {
    res.send({ success: false })
    console.log(error)
  }

})
//view-order-data
app.post("/myodata", async (req, res) => {
  try {
    const myemail = await Order.findOne({ 'email': req.body.email })
    console.log("-->E-mail found for MYORDERS:", myemail)
    res.send({ orderData: myemail })


  } catch (error) {
    res.send({ success: false })
  }

})
const instance=new Razorpay({

 
  })
  //paymentschema
  const paymentSchema=new mongoose.Schema({
   
      razorpay_order_id:{
        type:String,
        required:true
      },
      razorpay_payment_id:{
        type:String,
        required:true
      },
      razorpay_signature:{
        type:String,
        
      },
    })
    const payment=new mongoose.model("Payment",paymentSchema)

//check-out api
app.post("/checkout", async (req, res) => {
try {
  const options={
    amount:req.body.amount*100,
    currency:"INR",
  }
console.log(options)
  const order=await instance.orders.create(options)
console.log(order);

  res.status(200).json({success:true,order})
} catch (error) {
  console.log(error)
}
 
})

//payment-verification api
app.post("/pverification", async (req, res) => {
const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
console.log("order_id"+req.body.razorpay_order_id)
const body=razorpay_order_id+"|"+razorpay_payment_id;
const expectedsignature=crypto.createHmac('sha256',"kaudhby0zlJBzJbhQYLOd0Nc").update(body.toString()).digest('hex')

const isauth=(expectedsignature===razorpay_signature)
if(isauth){
  res.redirect(`http://localhost:3000/paymentsuccess`)
  await payment.create({razorpay_order_id,razorpay_payment_id,razorpay_signature})  
}else{
  res.status(400).json({success:false})
}
})
app.get("/getkey",(req,res)=>{
 res.status(200).json({key:process.env.SECRET})
})

app.post("/pcheck",async(req,res)=>{
  try {
    const ordata = await payment.findOne({razorpay_order_id:req.body.order_id})
    console.log(ordata.razorpay_order_id,"|",ordata)
    if(ordata.razorpay_order_id==req.body.order_id){
    res.send({success:true})

    }
    else{
      res.json({success:false})
    }
  } catch (error) {
    res.send(error)
    console.log(error)
  }
})
//port start
app.listen(5000, () => {
  console.log("-->PORT CONNECTED");
}
)