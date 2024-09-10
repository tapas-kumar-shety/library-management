const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Static method to validate username and password
userSchema.statics.findAndValidate = async function (userName, password) {
    const foundUser = await this.findOne({ userName });
    
    // Check if the user was found
    if (!foundUser) {
        return false;  // or throw a custom error if you prefer
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    
    return isMatch ? foundUser : false;
};

 userSchema.pre('save',async function(next){    
    
    if(!this.isModified('password')){
        return next();                  
                           
    }          
    this.password = await bcrypt.hash(this.password,12)                             

    next();                         
 })

const User = mongoose.model('User', userSchema);
module.exports = User;
