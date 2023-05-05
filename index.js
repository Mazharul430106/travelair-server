const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const app = express();
const port = 5000;
const cors = require('cors')

app.use(cors());
app.use(express.json());



const uri = "mongodb://travelAirlines:ZOpB5Z3u3EH9ZqCi@ac-gpqk4f0-shard-00-00.qm6ghoc.mongodb.net:27017,ac-gpqk4f0-shard-00-01.qm6ghoc.mongodb.net:27017,ac-gpqk4f0-shard-00-02.qm6ghoc.mongodb.net:27017/?ssl=true&replicaSet=atlas-rcscp7-shard-0&authSource=admin&retryWrites=true&w=majority";
MongoClient.connect(uri, function (err, client) {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        const serviceCollcetions = client.db('travelAirlines').collection('travelServices');
        const teamsCollcetions = client.db('travelAirlines').collection('teamsInfo');
        const reviewsCollections = client.db('travelAirlines').collection('serviceReviews');


        // get service data from database.
        app.get('/services', async (req, res) => {
            const query = {};
            const result = await serviceCollcetions.find(query).toArray();
            res.send(result);
        })

        // get specific service data from database.
        app.get('/service/:id', async (req, res) => {
            const id = req.params;
            const query = { _id: new ObjectId(id) }
            const result = await serviceCollcetions.findOne(query);
            res.send(result);
        })

        // geting teams data from database.
        app.get('/teams', async (req, res) => {
            const query = {};
            const result = await teamsCollcetions.find(query).toArray();
            res.send(result);
        })

        // post reviews from database. 
        app.post('/reviews', async(req, res)=>{
            const reivew = req.body;
            const result = await reviewsCollections.insertOne(reivew);
            res.send(result);
        })
        
        // get coustomar reviews data from database
        app.get('/reviews', async(req, res)=>{
            const query = {};
            const result = await reviewsCollections.find(query).toArray();
            res.send(result);
        })    


    } finally {

    }
}
run().catch(error => {
    console.log(error);
});




app.get('/', async (req, res) => {
    res.send('Travelair Server is Running')
})

app.listen(port, () => {
    console.log(`Travelair server running on port ${port}`)
})