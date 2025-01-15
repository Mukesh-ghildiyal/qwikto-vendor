const Document = require('../Models/Document');
const UserDetails = require('../Models/UserDetails');

exports.uploadDocuments = async (req, res) => {
    const { aadharFront, aadharBack, voterFront, voterBack, panCard, fssaiPhoto } = req.files;

    // Ensure either Aadhar or Voter ID is provided
    if ((!aadharFront || !aadharBack) && (!voterFront || !voterBack)) {
        return res.status(400).json({ message: 'Either Aadhar or Voter ID is required' });
    }

    try {
        // Get the authenticated user's details
        const userDetails = await UserDetails.findOne({ phoneId: req.user.id }); // Assuming req.user.id is populated by middleware

        if (!userDetails) {
            return res.status(404).json({ message: 'User details not found' });
        }

        // Check if a document record already exists
        let document = await Document.findOne({ userDetailsId: userDetails._id });

        if (!document) {
            // Create a new document record if none exists
            document = new Document({
                userDetailsId: userDetails._id,
                aadharFront: aadharFront ? aadharFront[0].path : undefined,
                aadharBack: aadharBack ? aadharBack[0].path : undefined,
                voterFront: voterFront ? voterFront[0].path : undefined,
                voterBack: voterBack ? voterBack[0].path : undefined,
                panCard: panCard ? panCard[0].path : undefined,
                fssaiPhoto: fssaiPhoto ? fssaiPhoto[0].path : undefined,
            });
        } else {
            // Update the existing document record
            document.aadharFront = aadharFront ? aadharFront[0].path : document.aadharFront;
            document.aadharBack = aadharBack ? aadharBack[0].path : document.aadharBack;
            document.voterFront = voterFront ? voterFront[0].path : document.voterFront;
            document.voterBack = voterBack ? voterBack[0].path : document.voterBack;
            document.panCard = panCard ? panCard[0].path : document.panCard;
            document.fssaiPhoto = fssaiPhoto ? fssaiPhoto[0].path : document.fssaiPhoto;
        }

        await document.save();

        res.status(200).json({ message: 'Documents uploaded successfully', documents: document });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
