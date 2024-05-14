import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { mutate } from "swr";
import {
  Button,
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const TABLE_HEAD = ["ID", "Title", "Buletin", "Action"];

export function Buletin() {
  const [name, setName] = useState("");
  const [buletin, setBuletin] = useState("");
  const navigate = useNavigate();

  //GET METHOD
  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/buletin");
    return response.data;
  };
  const { data } = useSWR("buletin", fetcher);

  //POST METHOD
  const createBuletin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("buletin", buletin);
    try {
      await axios.post("http://localhost:5000/buletin", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/dashboard/buletin");
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE METHOD
  const deleteBuletin = async (buletinId) => {
    await axios.delete(`http://localhost:5000/buletin/${buletinId}`);
    mutate("buletin");
  };

  //EVENT File
  const loadFile = (e) => {
    const file = e.target.files[0];
    setBuletin(file);
  };

  if (!data) return console.log("");
  return (
    <div>
      <div className="bg-blueGray-100 relative mx-auto my-5 flex max-w-full flex-col break-words rounded-md border-t-[6px] border-t-cyan-500 shadow-lg">
        <div className="mb-0 rounded-t border-b-[1px] border-b-gray-300 bg-white p-2">
          <div className="flex justify-between text-center">
            <h6 className="text-blueGray-700 pl-5 text-xl">Input Buletin</h6>
          </div>
        </div>
        <div className="flex-auto bg-[#ffffffe5] px-4 py-10 pt-0 lg:px-6">
          <form onSubmit={createBuletin}>
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
                </div>
              </div>
            </div>
            <div className="mr-6 flex-auto bg-[#ffffffe5] pt-10 lg:px-6">
              <div className="flex justify-end gap-4 text-center">
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

      <div className="bg-blueGray-100 relative mx-auto my-5 flex max-w-full flex-col break-words rounded-md border-t-[6px] border-t-cyan-500 shadow-lg">
        <div className="mb-0 rounded-t border-b-[1px] border-b-gray-300 bg-white p-2">
          <div className="flex justify-between text-center">
            <h6 className="text-blueGray-700 pl-5 text-xl">Data Buletin</h6>
          </div>
        </div>
        <div className="flex-auto bg-[#ffffffe5] px-4 py-10 pt-0 lg:px-6">
          <Card className="my-5 h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="text-center font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((buletin, index) => {
                  return (
                    <tr
                      key={buletin.id}
                      className="text-center even:bg-blue-gray-50/50 "
                    >
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {buletin.name}
                        </Typography>
                      </td>
                      <td className="flex items-center justify-center p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {buletin.buletin}
                        </Typography>
                      </td>
                      <td className="w-[150px] p-4 text-center">
                        <Link to={`/dashboard/editBuletin/${buletin.id}`}>
                          <Tooltip content="Edit">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4 rounded text-[#1DA1F2] hover:shadow-[#1DA1F2]/20 focus:shadow-[#1DA1F2]/20 active:shadow-[#1DA1F2]/10" />
                            </IconButton>
                          </Tooltip>
                        </Link>

                        <Tooltip content="Delete">
                          <IconButton
                            onClick={() => deleteBuletin(buletin.id)}
                            variant="text"
                          >
                            <TrashIcon className="h-4 w-4 rounded text-[#ea4335] hover:shadow-[#1DA1F2]/20 focus:shadow-[#1DA1F2]/20 active:shadow-[#1DA1F2]/10" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Buletin;
