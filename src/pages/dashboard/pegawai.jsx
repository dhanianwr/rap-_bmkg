import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { Button, Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Nama", "NIP", "Pangkat/Gol", "Jabatan", "Action"];

export function Pegawai() {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [pangkat, setPangkat] = useState("");
  const [jabatan, setJabatan] = useState("");

  //GET METHOD
  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/pegawais");
    return response.data;
  };
  const { data } = useSWR("pegawais", fetcher);

  //POST METHOD
  const savePegawais = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/pegawais", {
      nama: nama,
      nim: nim,
      pangkat: pangkat,
      jabatan: jabatan,
    });
    navigate("/dashboard/pegawai");
  };

  //DELETE METHOD
  const deletePegawais = async (pegawaiId) => {
    await axios.delete(`http://localhost:5000/pegawais/${pegawaiId}`);
    mutate("pegawais");
  };

  if (!data) return console.log("Error");
  return (
    <div>
      <div className="bg-blueGray-100 relative mx-auto my-5 flex max-w-full flex-col break-words rounded-md border-t-[6px] border-t-cyan-500 shadow-lg">
        <div className="mb-0 rounded-t border-b-[1px] border-b-gray-300 bg-white p-2">
          <div className="flex justify-between text-center">
            <h6 className="text-blueGray-700 text-xl">
              Input Data Pegawai
            </h6>
          </div>
        </div>
        <div className="flex-auto bg-[#ffffffe5] px-4 py-10 pt-0 lg:px-6">
          <form
            onSubmit={savePegawais}
          >
            <div className="mt-6 flex flex-wrap">
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label
                    className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                    htmlFor="grid-password"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                    placeholder="Masukkan Nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label
                    className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                    htmlFor="grid-password"
                  >
                    NIM
                  </label>
                  <input
                    type="text"
                    className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                    placeholder="Masukkan NIM"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label
                    className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                    htmlFor="grid-password"
                  >
                    Pangkat/Gol
                  </label>
                  <input
                    type="text"
                    className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                    placeholder="Masukkan Pangkat"
                    value={pangkat}
                    onChange={(e) => setPangkat(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label
                    className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                    htmlFor="grid-password"
                  >
                    Jabatan
                  </label>
                  <input
                    type="text"
                    className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                    placeholder="Masukkan Jabatan"
                    value={jabatan}
                    onChange={(e) => setJabatan(e.target.value)}
                  />
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
            <h6 className="text-blueGray-700 text-xl">
              Data Pegawai
            </h6>
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
                {data.map((pegawai, index) => {
                  return (
                    <tr key={pegawai.id} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {pegawai.nama}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {pegawai.nip}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {pegawai.pangkat}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {pegawai.jabatan}
                        </Typography>
                      </td>
                      <td className="p-4 text-center">
                        <Link
                          to={`/dashboard/editCuaca1/${pegawai.id}`}
                          className="mr-1 rounded bg-blue-400 px-3 py-1 font-medium text-white hover:bg-blue-500"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deletePegawais(pegawai.id)}
                          className="rounded bg-red-400 px-3 py-1 font-medium text-white hover:bg-red-500"
                        >
                          Delete
                        </button>
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

export default Pegawai;
