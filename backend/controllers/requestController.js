const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Request = require('../models/Request');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const axios =require('axios');

// @desc    Submit a new request
// @route   POST /api/requests
// @access  Private



const submitRequest = asyncHandler(async (req, res) => {
    const { latitude, longitude } = req.body;
    const userEmail = req.user.email;
    const name = req.user.name;

    // Create a new request
    const newRequest = await Request.create({
        location: { latitude, longitude },
        userEmail,
    });

    // Add request to user's request list and increase earned reward points
    const user = await User.findOne({ email: userEmail });
    user.requestList.push(newRequest._id);
    user.earnedReward = (user.earnedReward || 0) + 1; // Increment reward points
    await user.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Request Submitted',
        text: `Thank you ${name} for submitting the request for cleaning the area. We will process it shortly.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Failed to send email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json(newRequest);
        }
    });
});



// @desc    Get all requests based on user role
// @route   GET /api/requests
// @access  Private
const getAllRequests = asyncHandler(async (req, res) => {
    const user = req.user;

    let requests;
    if (user.role === 'officer') {
        requests = await Request.find({});
    } else {
        requests = await Request.find({ userEmail: user.email });
    }

    res.json(requests);
});

// @desc    Resolve a request
// @route   PUT /api/requests/:id/resolve
// @access  Private
const resolveRequest = asyncHandler(async (req, res) => {
    const user = req.user;

    if (user.role !== 'officer') {
        return res.status(403).json({ message: 'Only officers can resolve requests' });
    }

    const request = await Request.findById(req.params.id);

    if (!request) {
        return res.status(404).json({ message: 'Request not found' });
    }

    request.status = 'resolved';
    request.resolvedTime = new Date();
    await request.save();

    res.json(request);
});



// @desc    Scan and get recycling information
// @route   POST /api/requests/scan
// @access  Private

const scanTrash = asyncHandler(async (req, res) => {
    const { trashClass } = req.body;

    const user = req.user;

    if (!trashClass) {
        return res.status(400).json({ message: 'Trash class is required' });
    }

    try {
        const prompt = `How can I recycle a ${trashClass}? Give steps in short.`;

        const response = await axios.post(
            language_model_link,
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const recyclingInfo = response.data.candidates[0].content.parts[0].text;

        // Increase earned reward points
        user.earnedReward = (user.earnedReward || 0) + 1;
        await user.save();

        res.status(200).json({
            message: `Recycling information for ${trashClass}.`,
            recyclingInfo: recyclingInfo,
        });
    } catch (error) {
        console.error('Error communicating with Google AI:', error.message);
        res.status(500).json({ message: 'Failed to retrieve recycling information' });
    }
});


module.exports = {
    submitRequest,
    getAllRequests,
    resolveRequest,
    scanTrash
};
