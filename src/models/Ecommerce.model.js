import { model, Schema } from "mongoose";

const productSchema = new Schema({
    productId: { type: Number, required: true },
    code: String,
    name: String,
    brand: String,
    description: String,
    release_date: Date,
    specs: { type: Array, default: [] }

}, {
    collection: 'products',
    timestamps: true,
})

// Cart model
const cartSchema = new Schema({
    userId: Number,
    cartId: Number,
    status: { type: String, default: 'active' },
    modifiedOn: { type: Date, default: Date.now() },
    products: Array
}, {
    collection: 'carts',
    timestamps: true,
})


// Order model
const orderSchema = new Schema({
    userId: Number,
    cartId: Number,
    shipping: Object,
    payment: Object,
    products: Array
}, {
    collection: 'orders',
    timestamps: true,
})


// Inventory model
const inventorySchema = new Schema({
    productId: Number,
    quantity: Number,
    reservations: Array,
    // ex: {
    //     userId: 99,
    //     quantity: 5
    // }
    create_at: { type: Date, default: Date.now }
}, {
    collection: 'invetories',
    timestamps: true,
})

module.exports = {
    _product: model('products', productSchema),
    _cart: model('carts', cartSchema),
    _order: model('orders', orderSchema),
    _inventory: model('invetories', inventorySchema)
}