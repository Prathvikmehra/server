const express = require("express");

const app = express();
app.use(express.json());

const users = [
    {attendence:'80',uid:108243,total_sub:14,bonus:'30',name:'dax'},
    {attendence:'60',uid:103892,total_sub:11,bonus:'30',name:'kun'},
    {attendence:'90',uid:100192,total_sub:13,bonus:'30',name:'simba'},
    {attendence:'12',uid:101561,total_sub:12,bonus:'30',name:'land'}
]

app.get("/users", (req, res) => {
  res.send("Server is running 🚀");
});


app.get("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const user = users.find(u => u.uid === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});



app.post("/users", (req, res) => {
  const newUser = {
    uid: Date.now(), 
    attendence: req.body.attendence,
    total_sub: req.body.total_sub,
    bonus: req.body.bonus,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json({
    message: "User created",
    user: newUser
  });
});


app.put("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);
  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }
 
  users[index] = {
    ...users[index],
    ...req.body
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index]
  });
});



app.listen(3000, () => {
console.log("Server started on port 3000");
});
