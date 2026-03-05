import ImageKit from "imagekit"
import fs from "fs"

const ImageKitCLient = new ImageKit({
    // publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    // privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    privateKey:  "private_wxu++MBMXjBC5lLWMs9fgkhCeBc=" , 
publicKey :  "public_l0C61q0XYStZneWL+JxnrvYO2Lw=",
urlEndpoint : "https://ik.imagekit.io/maazkhan"
})


async function uploadimage(file) {
 
    try {
        
    const result = await ImageKitCLient.upload({
        file: file.buffer.toString("base64"),
        fileName: file.originalname,
        folder: "/social",

    });

    // fs.unlinkSync(file.path)
    return result
    } catch (error) {
        console.log("image upload " , error)
        throw error
    }
}

async function deleteImage(fieldId) {
    try {
        const resule = await ImageKitCLient.deleteFile(fieldId)
        return resule
    } catch (error) {
            console.log("image delete error:", error);
    throw error;
    }
}

export { uploadimage, deleteImage };