const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());

var soundList = [
  {
    id: 1,
    title: "Sound Example",
    description: "example for sound description",
    sound: "some sound file",
  },
  {
    id: 2,
    title: "sound 2",
    description: "sound type...",
    sound: "sound file",
  },
];

app.get("/api", (req, res) => {
  res.send(soundList);
});

//create new sound
app.post("/newSound", (req, res) => {
  console.log("new sound added");
  const sound = {
    id: soundList.length + 1,
    title: req.body.title,
    description: req.body.description,
    sound: req.body.sound,
  };
  soundList.push(sound);
  return res.status(201).send({
    success: "true",
    message: "sounds added succesfully",
    sound,
  });
});

//update a sound
app.put("/updateSound/:title", (req, res) => {
  const title = req.params.title;

  const updatedSound = {
    id: req.body.id,
    titile: title,
    description: req.body.description,
    sound: req.body.sound,
  };

  for (let i = 0; i < soundList.length; i++) {
    if (soundList[i].title == title) {
      soundList[i] = updatedSound;
      return res.status(201).send({
        success: "true",
        message: "new sound added successfully",
        updatedSound,
      });
    }
  }
  return res.status(404).send({
    success: "true",
    message: "error in update",
  });
});

//Delete a sound
app.delete("/deleteSound/:title", (req, res) => {
  
  const title = req.params.title;
  console.log("delete sound " + title);
  for (let i = 0; i < soundList.length; i++) {
    if (soundList[i].title == title) {
      soundList.splice(i, 1);

      return res.status(201).send({
        success: "true",
        message: "successfully deleted sound",
      });
    }
  }
  return res.status(404).send({
    success: "true",
    message: "error in delete",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on 3001`);
});
