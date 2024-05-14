import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Typography } from "@material-tailwind/react";

export function CuacaBesok() {
  const [nameBO, setNameBO] = useState("");
  const [fotoBO, setFotoBO] = useState([]);
  const navigate = useNavigate();

  //POST METHOD
  const createCuacaBesok = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nameBO);
    formData.append("foto", fotoBO);
    try {
      await axios.post("http://localhost:5000/cuacabesok", formData, {
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
  const loadImageBO = (e) => {
    const image = e.target.files[0];
    setFotoBO(image);
  };
  return <div>
    <form className="flex flex-wrap" onSubmit={createCuacaBesok}>
              <div className="w-full px-4 lg:w-3/4">
                <div className="relative mb-3 w-full ">
                  <label
                    className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                    htmlFor="grid-password"
                  >
                    Cuaca Besok
                  </label>
                  <div className="flex flex-wrap space-x-5">
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 h-10 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2 lg:w-1/3"
                      placeholder="Title"
                      value={nameBO}
                      onChange={(e) => setNameBO(e.target.value)}
                    />
                    <input
                      className="h-10 w-full cursor-pointer rounded-l-lg rounded-r border-0 bg-white text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2 lg:w-7/12"
                      type="file"
                      onChange={loadImageBO}
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
  </div>;
}

export default CuacaBesok;
