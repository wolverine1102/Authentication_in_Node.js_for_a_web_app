const token = require('./token')
const authenticateToken = token.authenticateToken;

function profile(app, allUsersData) {
    app.get('/profile', authenticateToken, (req, res) => {
        allUsersData.forEach(alreadyExistingUser => {
            if (alreadyExistingUser.username === req.username) {
                res.status(200).json({
                    "username": alreadyExistingUser.username,
                    "name": alreadyExistingUser.name,
                    "college": alreadyExistingUser.college,
                    "graduationYear": alreadyExistingUser.graduationYear
                })
            }
        })
    });

    app.put('/profile', authenticateToken, (req, res) => {
        allUsersData.forEach(alreadyExistingUser => {
            if (alreadyExistingUser.username === req.username) {
                if (req.body.name) {
                    alreadyExistingUser.name = req.body.name;
                }
                if (req.body.college) {
                    alreadyExistingUser.college = req.body.college;
                }
                if (req.body.graduationYear) {
                    alreadyExistingUser.graduationYear = req.body.graduationYear;
                }

                res.status(200).json({
                    success: true,
                    data: {
                        "username": alreadyExistingUser.username,
                        "name": alreadyExistingUser.name,
                        "college": alreadyExistingUser.college,
                        "graduationYear": alreadyExistingUser.graduationYear
                    }
                })
            }
        })
    });
}


module.exports.profile = profile;