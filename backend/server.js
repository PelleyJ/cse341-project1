const express = require("express");
const cors = require("cors");
const contactsRoutes = require("./routes/contacts");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/contacts", contactsRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});