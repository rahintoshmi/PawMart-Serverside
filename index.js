const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb"); //mongodb package
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());
//mongodb connection
const uri ="mongodb+srv://pawmartuser:mbjGXPJImpcYEbXJ@cluster0.8meqpjp.mongodb.net/?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running now on http://localhost:${port}`);
});


