const User = require('../Models/User');
const crypto = require('crypto');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Generate OTP and send it
exports.sendOtp = async (req, res) => {
    const { phone } = req.body;

    if (!phone) return res.status(400).json({ message: 'Phone number is required' });

    const otp = crypto.randomInt(1000, 9999).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    try {
        let user = await User.findOne({ phone });
        if (!user) {
            user = new User({ phone });
        }

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE,
            to: phone,
        });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    const { phone, otp } = req.body;
    console.log("Phone:", phone, "OTP:", otp);

    if (!phone || !otp) return res.status(400).json({ message: 'Phone and OTP are required' });

    try {
        const user = await User.findOne({ phone });

        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send response with token
        res.status(200).json({
            message: 'Phone number verified successfully',
            token,  // Send the JWT token to the user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
