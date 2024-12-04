const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port =process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// user: rockyislam
// pass: 0d10EG8VYkiBXl72

app.get('/', (req, res) =>{
    res.send('CURD IS RUNNING')
})

app.listen(port, () =>{
    console.log(`Server Running on port = ${port}`)
})

// data base


const uri = "mongodb+srv://rockyislam:0d10EG8VYkiBXl72@cluster0.bhp2qs5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    // my code here 

    const database = client.db('userDb-b9');
    const usersCollection = database.collection('users')

    app.post('/users', async(req, res) =>{
        const user = req.body;
        console.log(user)
        const result = await usersCollection.insertOne(user);
        res.send(result);
    })

    // show user
    app.get('/users', async(req, res) =>{
        const cursor = usersCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })

    // delete
    app.delete('/users/:id', async(req, res) =>{
        const id = req.params.id;
        console.log('delete id', id)
        const query = {_id: new ObjectId(id)};
        const result = await usersCollection.deleteOne(query)
        res.send(result)
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
