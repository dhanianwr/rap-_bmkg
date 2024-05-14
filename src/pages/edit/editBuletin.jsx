import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function EditBuletin() {
  const [name, setTitle] = useState("");
  const [buletin, setBuletin] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  //GET METHOD
  useEffect(() => {
    const getBuletinById = async () => {
      const response = await axios.get(`http://localhost:5000/buletin/${id}`);
      setTitle(response.data.name);
      setBuletin(response.data.buletin);
      setPreview(response.data.url);
    };
    getBuletinById();
  }, [id]);

  //POST METHOD
  const updateBuletin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("buletin", buletin);
    try {
      await axios.patch(`http://localhost:5000/buletin/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/dashboard/buletin");
    } catch (error) {
      console.log(error);
    }
  };

  //EVENT File
  const loadFile = (e) => {
    const file = e.target.files[0];
    setBuletin(file);
    setPreview(URL.createObjectURL(file))
  };

  return (
    <div>
      <div className="bg-blueGray-100 relative mx-auto my-5 flex max-w-full flex-col break-words rounded-md border-t-[6px] border-t-cyan-500 shadow-lg">
        <div className="mb-0 rounded-t border-b-[1px] border-b-gray-300 bg-white p-2">
          <div className="flex justify-between text-center">
            <h6 className="text-blueGray-700 pl-5 text-xl">Edit Buletin</h6>
          </div>
        </div>
        <div className="flex-auto bg-[#ffffffe5] px-4 py-10 pt-0 lg:px-6">
          <form onSubmit={updateBuletin}>
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
                    Buletin
                  </label>
                  <input
                    className="w-full cursor-pointer rounded-l-lg rounded-r border-0 bg-white text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                    type="file"
                    name="filename"
                    onChange={loadFile}
                  />
                  <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    ** Size PDF maksimal 5Mb
                  </p>
                  <embed type="application/pdf" src={preview} width="60" height="40"></embed>
                </div>
              </div>
            </div>
            <div className="mr-6 flex-auto bg-[#ffffffe5] pt-10 lg:px-6">
              <div className="flex justify-end gap-4 text-center">
                <Button>
                  <Link to={`/dashboard/buletin`}>Cancel</Link>
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

export default EditBuletin;
