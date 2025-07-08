const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const conString = "mongodb://127.0.0.1:27017";
const client = new MongoClient(conString);
let db;

// Connect to MongoDB once
async function connectToDB() {
  try {
    await client.connect();
    db = client.db("todo-react");
    console.log("MongoDB connected");

    // Start server only after DB is connected
    app.listen(3300, () => {
      console.log("Server started: http://127.0.0.1:3300");
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectToDB();

// User Routes
app.get("/users", async (req, res) => {
  const users = await db.collection("tblusers").find({}).toArray();
  res.send(users);
});

app.post("/register-user", async (req, res) => {
  const user = req.body;
  await db.collection("tblusers").insertOne(user);
  console.log("User Registered");
  res.end();
});

app.put("/edit-user/:userid", async (req, res) => {
  await db.collection("tblusers").updateOne(
    { UserId: parseInt(req.params.userid) },
    {
      $set: {
        UserId: parseInt(req.body.UserId),
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile,
      },
    }
  );
  console.log("User Details Updated");
  res.end();
});

app.delete("/delete-user/:userid", async (req, res) => {
  await db.collection("tblusers").deleteOne({
    UserId: parseInt(req.params.userid),
  });
  console.log("User Deleted");
  res.end();
});

// Appointment Routes
app.get("/appointments/:userid", async (req, res) => {
  const appointments = await db
    .collection("tblappointments")
    .find({ UserId: req.params.userid })
    .toArray();
  res.send(appointments);
});

app.post("/add-appointment", async (req, res) => {
  const appointment = {
    Appointment_id: parseInt(req.body.Appointment_id),
    Title: req.body.Title,
    Description: req.body.Description,
    Date: new Date(req.body.Date),
    UserId: req.body.UserId,
  };
  await db.collection("tblappointments").insertOne(appointment);
  console.log("Appointment Added");
  res.end();
});

app.put("/edit-appointment/:id", async (req, res) => {
  await db.collection("tblappointments").updateOne(
    { Appointment_id: parseInt(req.params.id) },
    {
      $set: {
        Appointment_id: parseInt(req.body.Appointment_id),
        Title: req.body.Title,
        Description: req.body.Description,
        Date: new Date(req.body.Date),
        UserId: req.body.UserId,
      },
    }
  );
  console.log("Appointment Details Updated");
  res.end();
});

app.delete("/delete-appointment/:id", async (req, res) => {
  await db.collection("tblappointments").deleteOne({
    Appointment_id: parseInt(req.params.id),
  });
  console.log("Appointment Deleted");
  res.end();
});

app.get("/get-appointment/:id", async (req, res) => {
  const data = await db
    .collection("tblappointments")
    .find({ Appointment_id: parseInt(req.params.id) })
    .toArray();
  res.send(data);
});
