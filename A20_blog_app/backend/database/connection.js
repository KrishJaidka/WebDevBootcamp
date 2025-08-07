const mongoose = require("mongoose");
const PORT = 27017;

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:${PORT}/blog`)
        console.log(`Database connected to server\nDatabase running on port ${PORT}`);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;