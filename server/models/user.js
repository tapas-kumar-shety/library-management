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


userSchema.statics.findAndValidate = async function (userName, password) {
    const foundUser = await this.findOne({ userName });
    
    if (!foundUser) {
        return false;  
    }
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
