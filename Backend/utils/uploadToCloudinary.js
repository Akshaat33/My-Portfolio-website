import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (fileBuffer, folder = "portfolio/profile", resourceType = "image" ) => {
    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: resourceType
            },
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);

            }
        );

        uploadStream.end(fileBuffer);

    });
};

export default uploadToCloudinary;
