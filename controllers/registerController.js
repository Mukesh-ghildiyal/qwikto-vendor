const User = require('../Models/User');
const UserDetails = require('../Models/UserDetails');

exports.registerUser = async (req, res) => {
    const {
        name,
        email,
        panNo,
        gst,
        bankName,
        ifscCode,
        fssaiNo,
    } = req.body;

    if (!name || !email || !panNo || !gst || !bankName || !ifscCode || !fssaiNo) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Ensure the user is authenticated and get the authenticated user's phone
        const phoneRecord = await User.findById(req.user.id); // Assuming req.user.id contains the authenticated user ID
        if (!phoneRecord || !phoneRecord.isVerified) {
            return res.status(400).json({ message: 'Phone number is not verified or user does not exist' });
        }

        // Check if user details already exist
        let userDetails = await UserDetails.findOne({ phoneId: phoneRecord._id });

        if (!userDetails) {
            // Create a new user details record
            userDetails = new UserDetails({
                phoneId: phoneRecord._id,
                name,
                email,
                panNo,
                gst,
                bankName,
                ifscCode,
                fssaiNo,
            });
        } else {
            // Update the existing user details record
            userDetails.name = name;
            userDetails.email = email;
            userDetails.panNo = panNo;
            userDetails.gst = gst;
            userDetails.bankName = bankName;
            userDetails.ifscCode = ifscCode;
            userDetails.fssaiNo = fssaiNo;
        }

        await userDetails.save();

        res.status(201).json({ message: 'User registered successfully', userDetails });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
