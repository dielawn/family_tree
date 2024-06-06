const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// HOME register or login forms
exports.home = (req, res) => {
    if (req.user) {
        res.status(200).json({ message: 'Valid token', user: req.user });
    } else {
        res.status(200).json({ message: 'Welcome, please login or register' });
    }
};

// login
exports.login = async (req, res) => {
    const { username, password } = req.body;
   try {
    // find user
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' })
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' })
    }
    // generate token
    const token = jwt.sign(
        { id: user._id, username: user.username, admin: user.admin }, 
        process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });    

    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` })
    }
}

// create user
exports.create_user = [
    body('username')
        .trim()
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters.')
        .escape(),
    body('password')
        .trim()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/)
        .withMessage('Password must contain at least one uppercase letter, one number, and one special character.'),
    body('confirmPwd')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
    })
    .trim(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
    try {
        const { username, password } = req.body

        // check for existing user
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = { username, password: hashedPassword };
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'New user created', id: savedUser._id });

    } catch (error) {
        res.status(500).json({ message: `Error creating user: ${error.message}` });
    }
}];

// view user
exports.get_user = async (req, res) => {
    try {
        if (req.user) {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: `Welcome, ${req.user.username}`, user });
        } else {
            res.status(401).json({ message: 'Unauthorized access, please login' });
        }

    } catch (error) {
        res.status(500).json({ message: `Error getting user: ${error.message}` });
    }
};

// update user
exports.update_user = async (req, res) => {
    try {
        const userToUpdate = await User.findById(req.params.id)
        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' })
        }
        const { username, password } = req.body

        if (username) {
            userToUpdate.username = username
        }

        if (password) {
            userToUpdate.password = await bcrypt.hash(password, 10)
        }

        const updatedUser = await userToUpdate.save();

         // User object without password
        const { password: _, ...userWithoutPassword } = updatedUser.toObject();
        res.status(200).json({ message: 'User updated', user: userWithoutPassword })

    } catch (error) {
        res.status(500).json({ message: `Error updating user: ${error.message}` });
    }
};

//delete user
exports.delete_user = async (req, res) => {
    try {
        const userToDelete = await User.findByIdAndDelete(req.params.id)
        if (!userToDelete) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: `Error deleting user: ${error.message}` });
    }
};