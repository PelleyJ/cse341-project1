const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const contactsRoutes = require("./routes/contacts");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
      description: "API documentation for the Contacts project"
    },
    servers: [
      process.env.RENDER
        ? { url: "https://cse341-project1-fd9o.onrender.com" }
        : { url: `http://localhost:${port}` }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/contacts", contactsRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});