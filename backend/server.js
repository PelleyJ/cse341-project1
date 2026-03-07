const express = require("express");
const cors = require("cors");
const contactsRoutes = require("./routes/contacts");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/contacts", contactsRoutes);

const port = process.env.PORT || 8080;

app.listen(8080, () => {
  console.log(`Server running on port ${port}`);
});