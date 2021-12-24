const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const sanitize = require('mongo-sanitize');
const User = require('./model');

mongoose.connect('mongodb://127.0.0.1:27017/users_db', { useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Connection open");
})
.catch(err => {
    console.log("Error: ");
    console.log(err);
});

const loginurl = async (req, res) => {
    try {
        User.find({
            "user": req.query.user,
            "password": req.query.password
        }, (err, user) => {
            if (err) {
                res.status(401).send(err);
            }
            if (!user || !user.length) {
                res.status(401).send("Username not valid");
            } else {
                res.status(200).send(user);
            }
        })

    } catch (err) {
        console.log(err);
    }

};

const login = async (req, res) => {
    try {
        User.findOne({username: req.body.username}, (err, user) => {
            if (err) {
                res.status(401).send(err);
            }
            if (!user) {
                res.status(401).send("Username not valid");
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (!result) {
                        res.status(401).send("Invalid Password");
                    } else {
                        res.status(200).send(user);
                    }
                });
            }
        })
    } catch (err) {
        console.log(err);
    }
};

const register = async (req, res, next) => {
    try {
        let user = new User(req.body);
        await user.save((err, userModel) => {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        })
    } catch (err) {
        console.log(err);
    }

};

const changePassword = async (req, res) => {
    try {
        //"username": {"$ne": 1},
        //un = sanitize(req.body.username);
        un = req.body.username;
        User.findOneAndUpdate({username: un}, {password: req.body.password}, {new: true}, (err, user) => {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        })
    } catch (err) {
        console.log(err);
    }

};

const changePasswordSanitize = async (req, res) => {
    try {
        //"username": {"$ne": 1},
        un = sanitize(req.body.username);
        User.findOneAndUpdate({username: un}, {password: req.body.password}, {new: true}, (err, user) => {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        })
    } catch (err) {
        console.log(err);
    }

};



const deleteUser = async (req, res) => {
    try {
        User.deleteOne({_id: req.params.userID}, (err, user) => {
            console.log(req.params.userID);
            if (err) {
                res.send(err);
            } else {
                console.log(user);
                res.json({message: 'User deleted succesfully'});
            }
        })
    } catch(err) {
        console.log(err);
    }

}

module.exports = {
    loginurl,
    login,
    register,
    changePassword,
    changePasswordSanitize,
    deleteUser
}