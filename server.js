// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const morgan = require('morgan')
const Food = require("./models/Food")





// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_method'))
app.use(morgan('dev'))


async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}


conntectToDB()


















// Routes go here
app.get('/',(req,res)=>{
    res.render('homepage.ejs')
})
app.get('/food/new',(req,res)=>{
    res.render('create-food.ejs')
})
app.post('/food', async(req,res)=>{
    const createdFood = await Food.create({name : req.body.name,
        ingredients: req.body.ingredients
    })
    res.redirect('/')
})
app.get('/food',async (req,res)=>{
    const allfood = await Food.find()
     res.render('food-list.ejs',{food: allfood})
})
app.get('/food/:foodId',async(req,res)=>{
    const foundFood = await Food.findById(req.params.foodId)
    res.render('food-details.ejs',{food: foundFood})
})
app.delete('/food/:foodId',async(req,res)=>{
    const deletedFood = await Food.findByIdAndDelete(req.params.foodId)
    res.redirect('/food')
})
app.get('/food/:foodId/edit',async(req,res)=>{
    const foundFood = await Food.findById(req.params.foodId)
    res.render('edit-food.ejs',{food: foundFood})
})

app.put('/food/:foodId',async(req,res)=>{
     const updatedFood = await Food.findByIdAndUpdate(req.params.foodId,req.body)

     res.redirect('/food')
})



 
 
 
 




app.listen(3000,()=>{
    console.log("Listening on port " + 3000)
}) // Listen on port 3000


