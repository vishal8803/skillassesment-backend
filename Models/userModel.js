const mongoose = require('mongoose');
const validator = require("email-validator");
const passwordValidator = require('password-validator');

var schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces


const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
        validate: function(){
            return validator.validate(this.userEmail);
        }
    },
    userPassword: {
        type: String,
        required: true,
        validate: function(){
            return schema.validate(this.userPassword);
        }
    }
})

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;