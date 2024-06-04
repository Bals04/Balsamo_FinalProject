const path = require('path');
const { getUsers, getUserbyID, create, deleteByID, updateByID } = require('../models/database');


module.exports = {
    load: async (req, res) => {
        try {
            const users = await getUsers();
            res.json(users);


        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    new: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views', 'new.html'));
    },
    update: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views', 'update.html'));
    },
    post: async (req, res) => {
        const { lastname, firstname } = req.body;
        try {
            await create(lastname, firstname);
            res.json({ success: true });
        } catch (error) {
            console.error("Error adding user:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await deleteByID(id);
            res.json({ success: true });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    put: async (req, res) => {
        try {
            const { id } = req.params;
            const { firstname, lastname } = req.body; // Extract firstname and lastname from request body
            await updateByID(id, firstname, lastname);
            res.json({ success: true });

        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
}