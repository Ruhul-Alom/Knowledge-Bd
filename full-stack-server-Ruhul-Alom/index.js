const express = require('express')
const ObjectID = require('mongodb').ObjectID;
const app = express()
const cors = require('cors');
require('dotenv').config();
const port = 5000
app.use(cors());
app.use(express.json())
app.get('/', (req, res) => {
    res.send("hello from db it's working")
})


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vlvew.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const allService = client.db("IT-Solution-Bd").collection("allService");
    const userReview = client.db("IT-Solution-Bd").collection("userReview");
    const orderInfo = client.db("IT-Solution-Bd").collection("orderInfo");
    // console.log('database connected');

    app.get('/services', (req, res) => {
        allService.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    
    app.get('/order', (req, res) => {
        orderInfo.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    app.get('/review', (req, res) => {
        userReview.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

   app.post('/addService', (req, res) => {
       const service = req.body;
    //    console.log(req.body)
       
    allService .insertOne(service, (err, result) => {
            res.send({count: result.insertedCount})
        })
    })


    app.get('/orders/:id', (req, res) => {

        const { id } = req.params;

        allService.find({_id: ObjectID(id)})
            .toArray((err, documents) => {
                res.send(documents[0])
            })
    })

    app.post('/addOrder', (req, res) => {
        const order = req.body;
        orderInfo.insertOne(order, (err, result) => {
            res.send({count: result.insertedCount})
        })
    })

    app.post('/addReview', (req, res) => {
        const review = req.body;
        userReview .insertOne(review, (err, result) => {
            res.send({count: result.insertedCount})
        })
    })

    app.post('/orderInfoByEmail', (req, res) => {
        const {email} = req.body;
        orderInfo.find({email: email})
            .toArray((err, documents) => {
                res.send(documents)
              
            })
    })

  

    app.delete('/deleteService/:id', (req, res) => {
        const id = req.params.id;
        // console.log(id)
        allService.findOneAndDelete({"_id":ObjectID(id)})
        .then(result => {
            res.send({count: result.deletedCount})
        })
  })
// app.post('/addService', (req, res) => {
//          const events = req.body;
//          console.log(events.length);
//          allService.insertMany(events, (err, result) => {
//             console.log(err, result.insertedCount);
//         })
//      })
//      app.post('/addReview', (req, res) => {
//         const events = req.body;
//         console.log(events.length);
//         userReview.insertMany(events, (err, result) => {
//            console.log(err, result.insertedCount);
//        })
//     })
   
});

app.listen(process.env.PORT || port);