const Url = require('../model/urlModel');

exports.createShortUrl = async (req, res) => {
    const { originalUrl } = req.body;

    try {
        const newUrl = new Url({ originalUrl });
        await newUrl.save();

        res.status(201).json(newUrl);
    } catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).json({ error: 'Failed to create short URL' });
    }
};

exports.getUrlDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const url = await Url.findById(id);
        if (!url)
            return res.status(404).json({
                error: 'URL not found'
            });
        res.json(url);
    } catch (error) {
        console.error('Error fetching URL:', error);
        res.status(500).json({ error: 'Failed to fetch URL details' });
    }
};

exports.getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find();
        res.json(urls);
    } catch (error) {
        console.error('Error fetching URLs:', error);
        res.status(500).json({ error: 'Failed to fetch URLs' });
    }
};

exports.updateUrl = async (req, res) => {
    const { id } = req.params;
    const { originalUrl } = req.body;

    try {
        const url = await Url.findById(id);
        if (!url) return res.status(404).json({ error: 'URL not found' });

        url.originalUrl = originalUrl;
        await url.save();

        res.json(url);
    } catch (error) {
        console.error('Error updating URL:', error);
        res.status(500).json({ error: 'Failed to update URL' });
    }
};

exports.deleteUrl = async (req, res) => {
    const { id } = req.params;
    try {
        const url = await Url.findByIdAndDelete(id);
        if (!url) return res.status(404).json({ error: 'URL not found' });

        res.json({ message: 'URL deleted successfully' });
    } catch (error) {
        console.error('Error deleting URL:', error);
        res.status(500).json({ error: 'Failed to delete URL' });
    }
};
