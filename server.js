const e = require("express");
const express = require("express");

const app = express();
app.use(express.json());

const users = [
  {
    id: 1,
    isActive: true,
    balance: "$1,111.15",
    picture: "http://placehold.it/32x32",
    age: 37,
    name: "Elsa Castaneda",
    gender: "female",
    company: "OTHERWAY",
    email: "elsacastaneda@otherway.com",
    phone: "+1 (988) 404-2932",
  },
  {
    id: 2,
    isActive: true,
    balance: "$1,823.59",
    picture: "http://placehold.it/32x32",
    age: 35,
    name: "Ollie Osborn",
    gender: "female",
    company: "VIASIA",
    email: "ollieosborn@viasia.com",
    phone: "+1 (947) 442-2611",
  },
  {
    id: 3,
    isActive: true,
    balance: "$1,734.78",
    picture: "http://placehold.it/32x32",
    age: 29,
    name: "Dean Huff",
    gender: "male",
    company: "NORALEX",
    email: "deanhuff@noralex.com",
    phone: "+1 (816) 575-2363",
  },
 
];
const children = [
  {
    id: 11,
    name: "Christina Bray",
    parent_id: 1,
    age: 6,
  },
  {
    id: 12,
    name: "Farrell Boone",
    parent_id: 1,
    age: 4,
  },
  {
    id: 13,
    name: "Gary Maddox",
    parent_id: 2,
    age: 4,
  },
  {
    id: 14,
    name: "Helena Burt",
    parent_id: 2,
    age: 6,
  },
  {
    id: 15,
    name: "Beryl Duke",
    parent_id: 2,
    age: 7,
  },
]; 


// endpoints

//read users
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/children", (req, res) => {
  console.log("aaa");
  res.json(children);
});

//read user
app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const result = users.find((user) => user.id == userId);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({
      msg: "Not found!",
    });
  }
});


//read user's children
app.get("/users/:userId/children/", function (req, res) {
  console.log("aaaa");
  const userId = req.params.userId;
  
  console.log(userId, "userId");
  // const result = []
  let result = children.filter((child) => child.parent_id == userId);
  // result.pu/sh(children.find((child) => child.parent_id == userId ))
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({
      msg: "Not found!",
    });
  }
});

//read user's child
app.get("/users/:userId/children/:childId", function (req, res) {
  const childId = req.params.childId;
  const userId = req.params.userId;
  console.log(req.params.userId);
  // res.json("ssss");
  const result = children.find(
    (child) => child.parent_id == userId && child.id == childId
  );
  console.log("aaaaaaaaa");
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({
      msg: "Not found!",
    });
  }
});
//delete user

 
app.delete("/users/:userId", (req, res) => {
  const userId = req.params.userId;
     console.log('sssss');
      const result = users.find((user) => user.id == userId);
      if (!result) {
        res.status(404).json({
          msg: "Not found!",
        });
      } else {
        const index = users.indexOf(result);
        users.splice(index, 1);
        res.sendStatus(204);
      }
});


app.delete("/users/:userId/children/:childId", function (req, res) {
  const childId = req.params.childId;
  const userId = req.params.userId;
  // res.json("ssss");
  const result = children.find(
    (child) => child.parent_id == userId && child.id == childId
  );
   if (!result) {
     res.status(404).json({
       msg: "Not found!",
     });
   } else {
     const index = children.indexOf(result);
     children.splice(index, 1);
     res.sendStatus(204);
   }
});

app.post("/users", (req, res) => {
  const body = req.body;

  // validation
  // unique id

  if (users.find((user) => user.id == body.id)) {
    res.status(409).json({
      msg: "Id already exists!",
    });
  } else if (
    !req.body.isActive ||
    !req.body.balance ||
    !req.body.picture ||
    !req.body.age ||
    !req.body.name ||
    !req.body.gender ||
    !req.body.company ||
    !req.body.email ||
    !req.body.phone
  ) {
    res.status(400).json({
      message: "All fields required",
    });
  } else {
    users.push(body);
    res.status(201).json(body);
  }
});




 
app.post("/children/", function (req, res) {
  console.log("aaaa");
  const body = req.body;

    if (children.find((child) => child.id == body.id)) {
      res.status(409).json({
        msg: "Id already exists!",
      });
    } else if (!req.body.name || !req.body.parent_id || !req.body.age) {
      res.status(400).json({
        message: "All fields required",
      });
    } else if (users.find((user) => user.id == req.body.parent_id)) {
      children.push(body);
      res.status(201).json(body);
    } else {
        res.status(404).json({
          msg: "Parent not found!",
        });
  }
  
});




 

app.listen(3000, () => console.log("Server started"));