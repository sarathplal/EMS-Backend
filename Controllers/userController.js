const users = require('../Models/userSchema')

// Register
exports.register = async (req, res) => {
    console.log("Register request received");
    console.log(req.body, req.file);

    const file = req.file.filename
    const { fname, lname, email, mobile, gender, status, location } = req.body

    if (!fname || !lname || !email || !mobile || !gender || !status || !location || !file) {
        res.status(403).json("All inputs are required")
    }

    try {
        const preuser = await users.findOne({ email })
        console.log("Preuser", preuser);
        if (preuser) {
            res.status(406).json("Employee already registered")
        } else {
            console.log("inside else case");
            const newuser = new users({
                fname, lname, email, mobile, gender, status, profile: file, location
            })
            console.log("new user created");

            await newuser.save()
            console.log("New user", newuser);
            res.status(200).json(newuser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}


// Get all Employees
exports.getAllEmployees = async (req, res) => {

    // get query parameter from request
    const { search } = req.query
    console.log(search);

    const query = {
        fname: { $regex: search, $options: 'i' }
    }

    try {
        const allEmployees = await users.find(query)
        res.status(200).json(allEmployees)
    } catch (error) {
        res.status(401).json(error)
    }
}

// View user
exports.viewuser = async (req, res) => {
    const { id } = req.params
    try {
        const employee = await users.findOne({ _id: id })
        if (employee) {
            res.status(200).json(employee)
        } else {
            res.status(404).json("Employee not found")
        }

    } catch (error) {
        res.status(401).json(error)
    }
}

// Delete user
exports.removeUser = async (req, res) => {
    // get id from params
    const { id } = req.params

    try {
        const removedItem = await users.findByIdAndDelete({ _id: id })
        res.status(200).json(removedItem)
    } catch (error) {
        res.status(401).json(error)
    }
}

// Update User
exports.edit = async (req, res) => {
    console.log("Inside Edit function");
    const { id } = req.params
    const { fname, lname, email, mobile, gender, status, location, user_profile } = req.body
    console.log(req.file);
    const file = req.file ? req.file.filename : user_profile

    // if (!fname || !lname || !email || !mobile || !gender || !status || !location || !file) {
    //     res.status(403).json("All inputs are required")
    // }

    try {
        const updateUser = await users.findByIdAndUpdate({ _id: id },
            {
                fname, lname, email, mobile, gender, status, profile: file, location
            }, {
            new: true
        }
        )
        await updateUser.save()
        res.status(200).json(updateUser)

    } catch (error) {
        res.status(401).json(error)
    }
}