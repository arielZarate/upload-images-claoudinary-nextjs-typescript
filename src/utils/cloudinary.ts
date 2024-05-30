import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
  secure: true,
});

export { cloudinary };

const folderName = "MascotasCloud";
const subfolder = "PetImages";

//==============en nextjs se maneja asi ==================

//opciones

export const uploadCloudinary = async (file: File) => {
  try {
    const { size, type, name } = file; //destructuring file
    const filename = path.basename(name); //creo un filename usando el mismo nombre
    const publicId = folderName
      ? `${folderName}/${subfolder}/${filename}`
      : filename;

    //===================converter buffer=============================================
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    //================================================================
    //resolviendo promesa
    const result = await new Promise((resolve, reject) => {
      //=============inicio de callback=======================
      const upload = cloudinary.uploader.upload_stream(
        {
          public_id: publicId,
          transformation: {
            width: 500,
            height: 500,
            crop: "limit",
            quality: "auto",
            // gravity: "auto",
          },
        },
        (error, result) => {
          if (error) {
            // console.log(error.message);
            return reject(error);
          } else {
            // console.log(result);
            return resolve(result?.secure_url);
          }
        }
      );
      upload.end(buffer);
      //==========fin del calback================
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
