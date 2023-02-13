const express = require("express")
const path = require("path")
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser")
const { connect } = require("http2");
// mongoose.connect('mongodb://localhost/gamingworld',{useNewUrlParser: true});

const connectDB = async () =>{
    try{
        const conn=await mongoose.connect('mongodb+srv://gamingworld:dbgamingworld@cluster0.qkbm0.mongodb.net/test',{
            useNewUrlParser: true,
            // useCreateIndex:true,
            // useFindAndModify:false,
            useUnifiedTopology:true,
        })
        console.log(`MongoDB connected successfully: ${conn.connection.host}`)
    }catch(error){
        console.log(error)
    }
}

connectDB()
const port = 8000;

// define mongode schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var contact = mongoose.model('contact',contactSchema);

// Express specific stuff
// serving static files
app.use('/static',express.static('static'));
app.use(express.urlencoded())
// Pug specific stuff
// set the template engine as pug
app.set('view engine', 'pug')
// set the views directory
app.set('views', path.join(__dirname,'views'))

app.get('/', (req, res)=> {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=> {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.get('/about', (req, res)=> {
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/services', (req, res)=> {
    const params = {}
    res.status(200).render('services.pug', params);
})
app.post('/contact', (req, res)=> {
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("Your details has been saved successfully")
    }).catch(()=>{
        res.status(400).send("Item was not saved")
    });
    // res.status(200).render('contact.pug');
});


// start the server
app.listen(port, ()=>{
    console.log(`the application stared sucessfully on a ${port}`)
})
