"use client";

import React, { useState } from "react";
import FormImages from "./FormImages";
import { ImageType, ImageListType } from "react-images-uploading";
import axios from "axios";

interface TypeForm {
  name: string;
  type_pet: string;
  file: ImageType | null;
}

const Form = () => {
  let [data, setData] = useState({
    name: "",
    type_pet: "",
  });
  const [file, setFile] = useState<ImageType | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //console.log(name, value);

    setData({
      ...data,
      [name]: value,
    });
  };

  const SendData = async (formData: FormData) => {
    try {
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const exit = await res.data;
      console.log(exit);
      return exit;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("type_pet", data.type_pet);

      let fileSelected = file?.file;
      if (fileSelected instanceof File) {
        formData.append("file", fileSelected);
      }

      // console.log(formData.get("name") + "   " + formData.get("type_pet"));
      //console.log(formData.get("file"));

      SendData(formData);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="my-10 py-2 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  items-center gap-2"
      >
        <div className="text-slate-700 font-bold">
          <label htmlFor="nameId" className="flex justify-start">
            Nombre de mascota
          </label>
          <input
            id="nameId"
            type="text"
            name="name"
            onChange={handleChange}
            value={data.name}
            className="border-2 border-blue-500 rounded-md p-2"
          />
        </div>

        <div className="text-slate-700 font-bold">
          <label htmlFor="type_pet" className="flex justify-start">
            Tipo de Animal
          </label>
          <input
            id="type_pet"
            type="text"
            name="type_pet"
            onChange={handleChange}
            value={data.type_pet}
            className="border-2 border-blue-500 rounded-md p-2"
          />
        </div>

        <FormImages image={file} setImage={setFile} />

        <div className="">
          <button
            type="submit"
            className=" font-bold  bg-blue-600 text-white w-32 py-2 rounded-lg"
          >
            Enviar Datos
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
