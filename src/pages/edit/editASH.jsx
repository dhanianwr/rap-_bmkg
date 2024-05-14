import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function EditASH() {
  const [name, setName] = useState("");
  const [foto, setFoto] = useState([]);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  //GET METHOD
  useEffect(() => {
    const getWisataASHById = async () => {
      const response = await axios.get(
        `http://localhost:5000/analisisSifatHujan/${id}`
      );
      setName(response.data.name);
      setFoto(response.data.foto);
      setPreview(response.data.url);
    };
    getWisataASHById();
  }, [id]);

  //POST METHOD
  const UpdateWisataASH = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("foto", foto);
    try {
      await axios.patch(`http://localhost:5000/analisisSifatHujan/${id}`, formData, {
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
  const loadImage = (e) => {
    const image = e.target.files[0];
    setFoto(image);
    setPreview(URL.createObjectURL(image));
  };
  return (
    <div>
      <div className="bg-blueGray-100 relative mx-auto my-5 flex max-w-full flex-col break-words rounded-md border-t-[6px] border-t-cyan-500 shadow-lg">
        <div className="mb-0 rounded-t border-b-[1px] border-b-gray-300 bg-white p-2">
          <div className="flex justify-between text-center">
            <h6 className="text-blueGray-700 pl-5 text-xl">
              Edit Analisis Sifat Hujan
            </h6>
          </div>
        </div>
        <div className="flex-auto bg-[#ffffffe5] px-4 py-10 pt-0 lg:px-6">
        <form onSubmit={UpdateWisataASH}>
            <div className="mt-6 flex flex-wrap">
              <div className="w-full px-4">
                <div className="relative mb-3 w-full lg:w-4/5">
                  <label
                    className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                    htmlFor="grid-password"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                    placeholder="Title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-4 lg:w-4/5">
                <div className="relative mb-3 w-full">
                  <label
                    className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                    htmlFor="grid-password"
                  >
                    Gambar
                  </label>
                  <input
                    className="w-full cursor-pointer rounded-l-lg rounded-r border-0 bg-white text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                    type="file"
                    name="filename"
                    onChange={loadImage}
                  />
                  <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    ** Size gambar maksimal 5Mb
                  </p>
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview Image"
                      className="w-96 pt-2"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="mr-6 flex-auto bg-[#ffffffe5] pt-10 lg:px-6">
              <div className="flex justify-end gap-4 text-center">
                <Button>
                  <Link to={`/dashboard/imageCuaca`}>Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  className="border-[#008d4c] bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#12613c]"
                >
                  Simpan
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditASH;
