const User = require('../../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
    create,
    login
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) throw new Error()
        const match = await bcrypt.compare(req.body.password, user.password)
    } catch {
        res.status(400).json('Login Failed, Invalid Credentials')
    }
}

async function create(req, res) {
    try {
        // Add the user to the database
        const user = await User.create(req.body)
        const token = createJWT(user)
        // Yes, we can use res.json to send back just a string
        // The client code needs to take this into consideration
        res.json(token)
    } catch (err) {
        // Client will check for non-2xx status code 
        // 400 = Bad Request
        res.status(400).json(err)
    }
}

/*-- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}