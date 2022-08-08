const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { mongoose } = require('./db/mongoose');


//load in the mongoose models
const {List} = require('./db/models/list.model');


// Load middleware
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));


// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, _id");

    next();
});

app.get('/contacts-list',(req,res)=>{
    List.find({}).then((lists)=>{
        res.send(lists);
    })
});

//CREATE  a list
app.post('/contacts-list',(req,res)=>{
  
    let name = req.body.name;
    let surname = req.body.surname;
    let company = req.body.company;
    let phone = req.body.phone;
    let mail = req.body.mail;
    let address = req.body.address;
    let imageSrc = req.body.imageSrc;

    let newList = new List({
        name,surname,phone,mail,address,company,imageSrc
    });
    newList.save().then((listDoc)=>{
        res.send(listDoc);
    })
});


//UPDATE,
 
app.patch('/edit-contact/:id',(req,res)=>{

    List.findOneAndUpdate({_id: req.params.id}, {
        $set: req.body
    }).then(()=>{
        res.sendStatus(200);
    });

});


app.get('/contact-details/:_id',(req,res)=>{

    List.findById(req.params._id).then((contact)=>{
        res.send(contact);
     
    })
});

app.get('/edit-contact/:_id',(req,res)=>{

    List.findById(req.params._id).then((contact)=>{
        res.send(contact);
    })
});

app.patch('/edit-contact/:_id', (req, res) => {
    List.findOneAndUpdate({ _id: req.params._id}, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
});

app.delete('/edit-contact/:_id', (req, res) => {
    List.findByIdAndRemove({ _id: req.params._id}, {
        _id: req.params.id
    }).then((removedContactDoc) => {
        res.send(removedContactDoc);
    });

});


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Server is listening on port "+port);
});