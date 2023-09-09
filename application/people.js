function people (app, allUsersData) {
    app.get('/people', (req, res) => {
        people = [];
        allUsersData.forEach(alreadyExistingUser => {
            people.push({
                "username" : alreadyExistingUser.username,
                "name" : alreadyExistingUser.name,
                "college" : alreadyExistingUser.college,
                "graduationYear" : alreadyExistingUser.graduationYear
            })
        });
        res.status(200).json(people);
    });
}

module.exports.people = people;