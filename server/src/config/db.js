const mongoose = require('mongoose');

const connectDB = async () => {
    if (process.env.NODE_ENV === 'test') {
        // Test environment handles connection dynamically via mongodb-memory-server
        return; 
    }
    
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/shopsmart';
        await mongoose.connect(uri);
        console.log('Connected to MongoDB via connectDB module');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
