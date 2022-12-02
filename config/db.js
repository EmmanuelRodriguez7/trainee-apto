const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://EmmanuelRo:Emmanuel123@cluster0.t2ylo1a.mongodb.net/libreria?retryWrites=true&w=majority');
        console.log('MongoDB connected')
    }catch(err) {
        console.log(err)
    }
}

module.exports = { connectDB };