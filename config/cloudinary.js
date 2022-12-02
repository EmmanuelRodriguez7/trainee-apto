const { v2 } = require('cloudinary');

v2.config({
    cloud_name: 'dtlnxlvvf',
    api_key: '124425169587836',
    api_secret: 'Fd96YGemokruEAGvTvKpi_GLmLo',
    secure: true
});

async function uploadImage(filePath) {
    return await v2.uploader.upload(filePath, {
        folder: 'replit'
    })
};

async function deleteimage(publicId) {
    return await v2.uploader.destroy(publicId)
};

module.exports = {
    uploadImage,
    deleteimage
}