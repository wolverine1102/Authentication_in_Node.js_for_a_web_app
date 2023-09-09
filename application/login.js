const token = require('./token')

function login (app, allUsersData) {
    app.post('/register', (req, res) => {
        let currentUserData = {};
        let errors = {};

        ['username', 'name', 'password', 'college', 'graduationYear'].forEach(key => {
            if (req.body[key] === null || req.body[key] === undefined) {
                errors[key] = `${key} is a required parameter`;
            }
            else if (req.body[key] === "") {
                errors[key] = `${key} cannot be empty`;
            }
            else {
                currentUserData[key] = req.body[key];
            }
        })
        if (Object.keys(errors).length > 0) {
            res.status(400).json(errors);
            return;
        }

        let usernameAlreadyExists = false;
        allUsersData.forEach(alreadyExistingUser => {
            if (alreadyExistingUser.username === currentUserData.username) {
                usernameAlreadyExists = true;
            }
        })
        if (usernameAlreadyExists) {
            res.status(400).json({
                message: 'Username already taken'
            });
            return;
        }
        allUsersData.push(currentUserData);
        res.status(200).json({
            success: true,
            data: {
                username: currentUserData.username,
                token: token.generateAccessToken(currentUserData.username)
            }
        });

    });
    
    app.post('/login', (req, res) => {
        let currentUserData = {};
        let errors = {};

        ['username', 'password'].forEach(key => {
            if (req.body[key] === null || req.body[key] === undefined) {
                errors[key] = `${key} is a required parameter`;
            }
            else if (req.body[key] === "") {
                errors[key] = `${key} cannot be empty`;
            }
            else {
                currentUserData[key] = req.body[key];
            }
        })

        if (Object.keys(errors).length > 0) {
            res.status(400).json(errors);
            return;
        }

        allUsersData.forEach(alreadyExistingUser => {
            if (alreadyExistingUser.username === currentUserData.username && alreadyExistingUser.password === currentUserData.password) {
                ['username', 'password'].forEach(key => {
                    currentUserData[key] = req.body[key];
                });        
                res.status(200).json({
                    success: true,
                    data: {
                        username: currentUserData.username,
                        token: token.generateAccessToken(currentUserData.username)
                    }
                });
            }
            else if (alreadyExistingUser.username === currentUserData.username && alreadyExistingUser.password != currentUserData.password) {
                res.status(401).json({
                    message : "Wrong Password"
                });
            }
            else {
                res.status(401).json({
                    message : "Username does not exists"
                });
            }
        })
    });
}

module.exports.login = login;
