const { cloudinary } = require("../config");

const imageUploaderSingle = async (path) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
    const result = await cloudinary.uploader.upload(path,options);
    return result.secure_url;
}

const imageUploaderMulti = async (req) => {
    const images = req.files.map((file) => file.path);
    let result = [];
    for(const image of images){
        const imgUrl = await imageUploaderSingle(image);
        result.push(imgUrl);
    }
    await Promise.all(result)
    return result;
}

module.exports = {
    imageUploaderMulti,
    imageUploaderSingle
}