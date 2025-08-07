const User = require("../models/UserModel")

const postLogic = async (req, res) => {
    try {
        const { name, email, role, password } = req.body
        if (!name || !email || !role || !password) {
            return res.status(400).json({
                message: "Missing user details, account couldn't be created",
                success: false
            })
        }
        const user = await User.create({ name, email, role, password })
        return res.status(201).json({
            success: true,
            message: 'Account created successfully.',
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error occurred while creating account.'
        })
        console.log(error);
    }
}

const validationLogic = async (req, res) => {
    try {
        const params = req.query;
        const { email, password } = params;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email and password missing in request"
            })
        }
        const user = await User.findOne({ "email": email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Account doesn't exists"
            })
        }
        if (user.password === password) {
            return res.status(200).json({
                success: true,
                message: "Account logged in successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Login failed. Incorrect credentials"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        console.log(error);
    }
}

// const getLogic = async (req, res) => {
//     try {
//         const user = await User.find()

//         if (!user || user.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'No users found'
//             })
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Data fetched successfully',
//             user
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: 'Failed to fetch data', 
//             error: error.message
//         })
//     }
// }

module.exports = { postLogic, validationLogic };