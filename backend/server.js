const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const dbConnect = require("./config/db.js");
const todoRoutes = require("./routes/todoRoute");

dotenv.config({
    path: path.join(__dirname, "config/.env"),
    quiet: true
});

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", todoRoutes);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await dbConnect();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();