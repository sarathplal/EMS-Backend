const express = require('express')
const userController = require('../Controllers/userController')
const multerInstance = require('../MulterConfig/multerMiddleware')

const router = new express.Router()

router.post('/register', multerInstance.single("user_profile"), userController.register)

router.get('/all-employees', userController.getAllEmployees)
// View user
router.get('/view-employee/:id', userController.viewuser)
// Delete user
router.delete('/remove-employee/:id',userController.removeUser)
// Update user
router.put('/edit/employee/:id', multerInstance.single("user_profile"), userController.edit)


module.exports = router