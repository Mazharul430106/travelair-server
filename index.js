const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express();
const port = 5000;
const cors = require('cors')

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://travelAirlines:ZOpB5Z3u3EH9ZqCi@cluster0.qm6ghoc.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)

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


        app.get('/services', async(req, res)=>{
            const query = {};
            const result = await serviceCollcetions.find(query).toArray();
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