const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb"); //mongodb package
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());
//mongodb connection
const uri ="mongodb+srv://pawmartuser:irfRov3XrwKrTH7D@cluster0.8meqpjp.mongodb.net/?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


app.get("/", (req, res) => {
  res.send("Hello World!!!!!");
});

async function run() {
  try {
 
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // Get database and collection 
    const db = client.db("pawmart");
    const listingsCollection = db.collection("listings");
    // Get latest 6 listings
    app.get("/api/listings", async (req, res) => {
      try {
        const listings = await listingsCollection
          .find({})
          .sort({ _id: -1 }) 
          .limit(6)
          .toArray();

        res.send(listings);
      } catch (err) {
        console.error("Error fetching listings:", err);
        res.status(500).send({ message: "Failed to fetch listings" });
      }
    });

    //for single product
    app.get("/api/listings/:id", async (req, res) => {
      const id = req.params.id;

      try {
        const listing = await listingsCollection.findOne({
          _id: new ObjectId(id),
        });
        if (!listing) {
          return res.status(404).send({ message: "Listing not found" });
        }
        res.send(listing);
      } catch (err) {
        console.error("Error fetching listing details:", err);
        res.status(500).send({ message: "Failed to fetch listing details" });
      }
    });

    // POST route for adding new listing
    app.post("/api/listings", async (req, res) => {
      try {
        const newListing = req.body;

        if (!newListing.name || !newListing.category || !newListing.email) {
          return res.status(400).send({ message: "Missing required fields" });
        }

        const result = await listingsCollection.insertOne(newListing);
        res.status(201).send({ message: "Listing added successfully", result });
      } catch (err) {
        console.error("Error adding listing:", err);
        res.status(500).send({ message: "Failed to add listing" });
      }
    });

    //pet and supplies
    app.get("/api/all-listings", async (req, res) => {
      try {
        const listings = await listingsCollection
          .find({})
          .sort({ _id: -1 })
          .toArray();
        res.send(listings);
      } catch (err) {
        console.error("Error fetching all listings:", err);
        res.status(500).send({ message: "Failed to fetch all listings" });
      }
    });
    app.get("/api/all-listings/:id", async (req, res) => {
      const id = req.params.id;

      try {
        const listing = await listingsCollection.findOne({
          _id: new ObjectId(id),
        });
        if (!listing)
          return res.status(404).send({ message: "Listing not found" });
        res.send(listing);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to fetch listing" });
      }
    });

    //For Orders
    const ordersCollection = db.collection("orders");
    app.post("/api/orders", async (req, res) => {
      try {
        const order = req.body;

        if (
          !order.listingId ||
          !order.listingName ||
          !order.userName ||
          !order.userEmail
        ) {
          return res.status(400).send({ message: "Missing required fields" });
        }

        const result = await ordersCollection.insertOne(order);
        res.status(201).send({ message: "Order placed successfully", result });
      } catch (err) {
        console.error("Error placing order:", err);
        res.status(500).send({ message: "Failed to place order" });
      }
    });

    app.get("/api/orders", async (req, res) => {
      try {
        // Get the email from the query parameter
        const { email } = req.query;

        if (!email) {
          return res
            .status(400)
            .send({ message: "Email query parameter is required" });
        }

        // Find all orders that match the userEmail field
        const query = { userEmail: email };
        const userOrders = await ordersCollection
          .find(query)
          .sort({ date: -1 }) // Optional: sort newest first
          .toArray();

        res.send(userOrders);
      } catch (err) {
        console.error("Error fetching user orders:", err);
        res.status(500).send({ message: "Failed to fetch orders" });
      }
    });

    /// Update listing
    app.put("/api/listings/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updatedData = req.body;

        // Validate ObjectId format
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid listing ID" });
        }

        // Remove _id from updateData if it exists
        delete updatedData._id;

        const result = await listingsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedData }
        );

        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Listing not found" });
        }

        res.send({
          message: "Listing updated successfully",
          modifiedCount: result.modifiedCount,
        });
      } catch (err) {
        console.error("Error updating listing:", err);
        res.status(500).send({ message: "Failed to update listing" });
      }
    });

    // ============ DELETE ROUTES ============

    // Delete listing
    app.delete("/api/listings/:id", async (req, res) => {
      try {
        const id = req.params.id;

        // Validate ObjectId format
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid listing ID" });
        }

        const result = await listingsCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "Listing not found" });
        }

        res.send({ message: "Listing deleted successfully" });
      } catch (err) {
        console.error("Error deleting listing:", err);
        res.status(500).send({ message: "Failed to delete listing" });
      }
    });

    const categoriesCollection = db.collection("categories");
    // Get all categories
    app.get("/api/categories", async (req, res) => {
      try {
        const categories = await categoriesCollection.find({}).toArray();
        res.send(categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).send({ message: "Failed to fetch categories" });
      }
    });

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    await client.close();
    process.exit(1); 
  }
}

run().catch(console.dir);