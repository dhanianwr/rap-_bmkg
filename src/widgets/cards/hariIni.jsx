import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Typography } from "@material-tailwind/react";

export function HariIni() {
  const [nameHI, setNameHI] = useState("");
  const [fotoHI, setFotoHI] = useState([]);
  const navigate = useNavigate();

  //POST METHOD
  const createCuacaHariIni = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nameHI);
    formData.append("foto", fotoHI);
    try {
      await axios.post("http://localhost:5000/cuacahariini", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/dashboard/imageCuaca");
    } catch (error) {
      console.log(error);
    }
  };

  //EVENT IMAGE
  const loadImageHI = (e) => {
    const image = e.target.files[0];
    setFotoHI(image);
  };
  return (
    <div>
      <form className="flex flex-wrap" onSubmit={createCuacaHariIni}>
        <div className="w-full px-4 lg:w-3/4">
          <div className="relative mb-3 w-full ">
            <label
              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
              htmlFor="grid-password"
            >
              Cuaca Hari Ini
            </label>
            <div className="flex flex-wrap space-x-5">
              <input
                type="text"
                className="placeholder-blueGray-300 text-blueGray-600 h-10 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2 lg:w-1/3"
                placeholder="Title"
                value={nameHI}
                onChange={(e) => setNameHI(e.target.value)}
              />
              <input
                className="h-10 w-full cursor-pointer rounded-l-lg rounded-r border-0 bg-white text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2 lg:w-7/12"
                type="file"
                onChange={loadImageHI}
              />
            </div>
          </div>
        </div>
        <div className="h-10 w-full px-4 lg:mt-7 lg:w-1/5">
          <Button
            type="submit"
            className="border-[#008d4c] bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#12613c]"
          >
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
}

export default HariIni;
