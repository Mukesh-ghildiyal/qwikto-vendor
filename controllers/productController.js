const Product = require('../Models/Product');
const cloudinary = require('../middleware/cloudinary');

// Add a new product
exports.addProduct = async (req, res) => {
    const { name, category, price } = req.body;

    if (!name || !category || !price || !req.file) {
        return res.status(400).json({ message: 'All fields are required, including an image' });
    }

    try {
        const result = await cloudinary.uploader.upload_stream({ folder: 'products' }).end(req.file.buffer);

        const product = new Product({
            vendor: req.user.id,
            name,
            category,
            price,
            image: result.secure_url,
        });

        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all products by vendor
exports.getVendorProducts = async (req, res) => {
    try {
        const products = await Product.find({ vendor: req.user.id });
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Edit a product
exports.editProduct = async (req, res) => {
    const { id } = req.params;
    const { name, category, price } = req.body;

    try {
        const product = await Product.findById(id);

        if (!product || product.vendor.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Product not found or unauthorized' });
        }

        product.name = name || product.name;
        product.category = category || product.category;
        product.price = price || product.price;

        if (req.file) {
            const result = await cloudinary.uploader.upload_stream({ folder: 'products' }).end(req.file.buffer);
            product.image = result.secure_url;
        }

        await product.save();
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product || product.vendor.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Product not found or unauthorized' });
        }

        await product.remove();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
