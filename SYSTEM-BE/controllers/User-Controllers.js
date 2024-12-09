const User = require("../models/User-Model.js");
const Enroll = require("../models/Enrollment-model.js");
const bcryptjs = require("bcryptjs");
const auth = require("../auth.js");

module.exports.registerUser = (req, res) => {
    let newUser = new User({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        password: bcryptjs.hashSync(req.body.password, 10)
    })

    return newUser.save()
    .then(result => {
        res.send({
            code: "REGISTRATION-SUCCESS",
            message: "You are now registered!",
            result: result
        })
    })
    .catch(error => {
        res.send({
            code: "REGISTRATION-FAILED",
            message: "We've encountered an error during the registration. Please try again!",
            result: error
        })
    })
}

// User Login
module.exports.loginUser = (req, res) =>{
    let {email, password} = req.body;
    return User.findOne({email: email}).then(result => {
        if(result == null){
            return res.send({
                code: "USER-NOT-REGISTERED",
                message: "Please register to login."
            })
        }else{
            const isPasswordCorrect = bcryptjs.compareSync(password, result.password);

            if(isPasswordCorrect){
                return res.send({
                    code: "USER-LOGIN-SUCCESS",
                    token: auth.createAccessToken(result)
                })
            }else{
                return res.send({
                    code: "PASSWORD-INCORRECT",
                    message: "Password is not correct. Please try again."
                })
            }
        }
    })
}

// Check email if existing
module.exports.checkEmail = (req,res) => {
    let {email} = req.body;
    return User.find({email: email}).then(result => {
        if(result.length > 0){
            return res.send({
                code: "EMAIL-EXISTS",
                message: "The user is registered."
            })
        }else{
            return res.send({
                code: "EMAIL-NOT-EXISTING",
                message: "The user is not registered."
            }) 
        }
    })
}

module.exports.getProfile = (req, res) => {
    const {id} = req.user;
    return User.findById(id).then(result => {
        if(result == null || result.length === 0){
            return res.send({
                code: "USER-NOT-FOUND",
                message: "Cannot find user with the provided ID."
            })
        }else{
            result.password = "*****";
            return res.json({
                code: "USER-FOUND",
                message: "A user was found.",
                result: result
            })
        }
    })
}

// Enroll a user
module.exports.enroll = (req, res) => {
    const {id} = req.user;
    
    let newEnrollment = new Enroll({
        userId: id,
        enrolledCourse: req.body.enrolledCourse,
        totalPrice: req.body.totalPrice
    })

    return newEnrollment.save().then((result, err) => {
        if(err){
            res.send({
                code: "ENROLLMENT-FAILED",
                message: "There is a problem during your enrollment, please try again!",
                error: err
            })
        }else{
            res.send({
                code: "ENROLLMENT-SUCCESSFUL",
                message: "Congratulations, you are now enrolled!",
                result: result
            })
        }
    })
}

// Change Password
module.exports.changePassword = async (req, res) => {
    const { id } = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
        return res.status(400).send({
            code: "PASSWORD-INVALID",
            message: "New password must be at least 6 characters long."
        });
    }

    try {
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).send({
                code: "USER-NOT-FOUND",
                message: "User not found."
            });
        }

        const isPasswordCorrect = bcryptjs.compareSync(currentPassword, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).send({
                code: "PASSWORD-INCORRECT",
                message: "The current password is incorrect."
            });
        }

        const hashedPassword = bcryptjs.hashSync(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.send({
            code: "PASSWORD-CHANGE-SUCCESS",
            message: "Password updated successfully."
        });

    } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).send({
            code: "SERVER-ERROR",
            message: "An error occurred while changing the password."
        });
    }
};
