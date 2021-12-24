var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userCategory: {
        type: String,
        default: "user"
    },
    firstName: String,
    lastName: String,
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        required: true,
        default: Date.now
    }
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports  = mongoose.model('userModel', userSchema);
