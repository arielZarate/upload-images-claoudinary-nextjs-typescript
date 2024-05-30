import { cloudinary, uploadCloudinary } from "@/utils/cloudinary";

export const POST = async (req: Request, res: Response) => {
  try {
    const formData = await req.formData();
    let file = formData.get("file") as File;

    const result = await uploadCloudinary(file);

    const objCloud = {
      url: result,
      name: formData.get("name"),
      type_pet: formData.get("type_pet"),
    };

    return Response.json({
      status: 201,
      objCloud,
      message: "Se ha subido la imagen",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

//====GET============
export const GET = () => {
  return Response.json("Welcome uplaod");
};
