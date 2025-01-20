const Document = require('../Models/Document');
const UserDetails = require('../Models/UserDetails');
const cloudinary = require('../middleware/cloudinary');

exports.uploadDocuments = async (req, res) => {
    const { aadharFront, aadharBack, voterFront, voterBack, panCard, fssaiPhoto } = req.files;

    // Ensure either Aadhar or Voter ID is provided
    if ((!aadharFront || !aadharBack) && (!voterFront || !voterBack)) {
        return res.status(400).json({ message: 'Either Aadhar or Voter ID is required' });
    }

    try {
        // Get the authenticated user's details
        const userDetails = await UserDetails.findOne({ phoneId: req.user.id });

        if (!userDetails) {
            return res.status(404).json({ message: 'User details not found' });
        }

        // Helper function to upload a file to Cloudinary
        const uploadToCloudinary = async (file) => {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'documents',
            });
            return result.secure_url;
        };

        // Upload files to Cloudinary and get URLs
        const documentData = {};
        if (aadharFront) documentData.aadharFront = await uploadToCloudinary(aadharFront[0]);
        if (aadharBack) documentData.aadharBack = await uploadToCloudinary(aadharBack[0]);
        if (voterFront) documentData.voterFront = await uploadToCloudinary(voterFront[0]);
        if (voterBack) documentData.voterBack = await uploadToCloudinary(voterBack[0]);
        if (panCard) documentData.panCard = await uploadToCloudinary(panCard[0]);
        if (fssaiPhoto) documentData.fssaiPhoto = await uploadToCloudinary(fssaiPhoto[0]);

        // Check if a document record already exists
        let document = await Document.findOne({ userDetailsId: userDetails._id });

        if (!document) {
            // Create a new document record
            document = new Document({ userDetailsId: userDetails._id, ...documentData });
        } else {
            // Update the existing document record
            Object.assign(document, documentData);
        }

        await document.save();

        res.status(200).json({ message: 'Documents uploaded successfully', documents: document });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
