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

const createContact = async (req, res) => {
  try {
    const db = await connectToDatabase();

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await db.collection("contacts").insertOne(contact);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating contact" });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = new mongodb.ObjectId(req.params.id);
    const db = await connectToDatabase();

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await db
      .collection("contacts")
      .replaceOne({ _id: contactId }, contact);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error updating contact" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = new mongodb.ObjectId(req.params.id);
    const db = await connectToDatabase();

    const result = await db.collection("contacts").deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact" });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};