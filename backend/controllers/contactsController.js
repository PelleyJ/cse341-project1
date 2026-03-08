const mongodb = require("mongodb");
const { connectToDatabase } = require("../data/database");

const getAllContacts = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const contacts = await db.collection("contacts").find().toArray();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contacts" });
  }
};

const getSingleContact = async (req, res) => {
  try {
    const contactId = new mongodb.ObjectId(req.params.id);
    const db = await connectToDatabase();
    const contact = await db.collection("contacts").findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contact" });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact
};