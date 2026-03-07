const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

const base64Image = fs
   .readFileSync(path.join(__dirname, "image.txt"), "utf8")
   .replace(/\s/g, "");

app.get("/professional", (req, res) => {
  res.json({
    professionalName: "Samuel Pelley",

    base64Image: base64Image,

    nameLink: {
      firstName: "Samuel",
      url: "https://www.byui.edu/"
    },

    primaryDescription: "Write a short paragraph about who you are and what you're studying.",

    workDescription1: "Write a paragraph about your work experience or what you've been building in school.",

    workDescription2: "Write a second paragraph about your interests, goals, or projects.",

    linkTitleText: "Links",

    linkedInLink: {
      text: "LinkedIn",
      link: "https://www.linkedin.com/in/pelleysamueltoma/"
    },

    githubLink: {
      text: "GitHub",
      link: "https://github.com/pelleyj"
    }
  });
});

app.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});