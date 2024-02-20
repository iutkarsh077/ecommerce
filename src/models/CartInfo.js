import mongoose from 'mongoose';

const MyCartSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: false,
    },
})

const MyCart = mongoose.models.MyCart || mongoose.model('MyCart', MyCartSchema);

export default MyCart;