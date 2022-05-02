const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

cloudinary.config({
    cloud_name: process.env.CLOUDSTORAGE_NAME,
    api_key: process.env.CLOUDSTORAGE_API_KEY,
    api_secret: process.env.CLOUDSTORAGE_SECRET_KEY,
    secure: true,
});

const uploadToCloud = async (req, res) => {
    const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };
    const result = await streamUpload(req);
    res.send({ success: 0, data: result.secure_url })
}

module.exports = {
    uploadToCloud,
}
