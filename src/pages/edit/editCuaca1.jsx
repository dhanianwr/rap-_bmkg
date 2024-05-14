import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { timeData, weathersData } from "@/data";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";
import { Button } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function EditCuaca1() {
  const [tanggal, setTanggal] = useState(null);
  const [waktu, setWaktu] = useState("");
  const [cuaca, setCuaca] = useState("");
  const [arahAngin, setArahAngin] = useState("");
  const [kecepatanAngin, setKecepatanAngin] = useState("");
  const [suhu, setSuhu] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  //GET METHOD
  useEffect(() => {
    const getWeatherById = async () => {
      const response = await axios.get(`http://localhost:5000/weathers/${id}`);
      // setTanggal(response.data.tanggal);
      setWaktu(response.data.waktu);
      setCuaca(response.data.cuaca);
      setArahAngin(response.data.arahAngin);
      setKecepatanAngin(response.data.kecepatanAngin);
      setSuhu(response.data.suhu);
    };
    getWeatherById();
  }, [id]);

  //UPDATED METHOD
  const updateWeather = async (e) => {
    let fixDate = tanggal.toISOString();
    e.preventDefault();
    await axios.patch(`http://localhost:5000/weathers/${id}`, {
      tanggal: fixDate,
      waktu: waktu,
      cuaca: cuaca,
      arahAngin: arahAngin,
      kecepatanAngin: parseInt(kecepatanAngin),
      suhu: parseInt(suhu),
    });
    navigate("/dashboard/cuaca1");
  };

  //TANGGAL EVENTS
  let newTanggal = parseISO(tanggal);

  //WAKTU EVENTS
  const [openWaktu, setOpenWaktu] = useState(false);

  const onClickWaktu = (value) => () => {
    setWaktu(value);
    setOpenWaktu(false);
  };

  //CUACA EVENTS
  const [openCuaca, setOpenCuaca] = useState(false);

  const onClickCuaca = (value) => () => {
    setCuaca(value);
    setOpenCuaca(false);
  };

  return (
    <div className="bg-blueGray-100 relative mx-auto my-5 flex max-w-full flex-col break-words rounded-md border-t-[6px] border-t-cyan-500 shadow-lg">
      <div className="mb-0 rounded-t border-b-[1px] border-b-gray-300 bg-white p-2">
        <div className="flex justify-between text-center">
          <h6 className="text-blueGray-700 text-xl">
            Edit Cuaca Terkini Banyuwangi
          </h6>
        </div>
      </div>
      <div className="flex-auto bg-[#ffffffe5] px-4 py-10 pt-0 lg:px-6">
        <form onSubmit={updateWeather}>
          <div className="mt-6 flex flex-wrap">
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative mb-3 w-full">
                <label
                  className="text-blueGray-600 mb-2 block text-sm font-bold"
                  htmlFor="grid-password"
                >
                  Tanggal
                </label>
                <DatePicker
                  className="w-full rounded bg-white px-3 py-3 text-sm shadow ring-cyan-600 focus:outline-none focus:ring-2"
                  dateFormat="dd-MM-yyyy"
                  selected={tanggal}
                  onChange={(date) => setTanggal(date)}
                  placeholderText="Masukkan Tanggal"
                />
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative mb-3 w-full">
                <label
                  className="text-blueGray-600 mb-3 block text-xs font-bold uppercase"
                  htmlFor="grid-password"
                >
                  Waktu
                </label>
                <div className="relative h-10 w-full min-w-[200px]">
                  <div
                    onClick={() => setOpenWaktu(!openWaktu)}
                    className={`peer w-full rounded-[7px] border bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${
                      openWaktu ? "border-blue-500" : "border-blue-gray-200 "
                    } h-11 text-center`}
                  >
                    <span
                      value={waktu}
                      onChange={(e) => setWaktu(e.target.value)}
                      className="absolute top-2/4 left-3 -translate-y-2/4 pt-0.5"
                    >
                      {waktu || "Pilih Waktu"}
                    </span>
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`absolute top-2/4 right-2 grid h-5 w-5 -translate-y-2/4 place-items-center pt-px text-blue-gray-400 transition-all
                       ${
                         openWaktu ? "mt-px rotate-180" : "rotate-0"
                       } duration-200`}
                    />
                  </div>
                  {openWaktu && (
                    <ul className="absolute top-[49px] left-0 z-[100] max-h-96 w-full origin-center transform-none overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 opacity-100 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                      {timeData.map(({ value, label }) => (
                        <li
                          key={value}
                          value={value}
                          onClick={onClickWaktu(value)}
                          className="cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 leading-tight outline outline-0 transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900"
                        >
                          {label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative mb-3 w-full">
                <label
                  className="text-blueGray-600 mb-3 block text-xs font-bold uppercase"
                  htmlFor="grid-password"
                >
                  Cuaca
                </label>
                <div className="relative h-10 w-full min-w-[200px]">
                  <div
                    onClick={() => setOpenCuaca(!openCuaca)}
                    className={`peer w-full rounded-[7px] border bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${
                      openCuaca ? "border-blue-500" : "border-blue-gray-200 "
                    } h-11 text-center`}
                  >
                    <span
                      value={cuaca}
                      onChange={(e) => setCuaca(e.target.value)}
                      className="absolute top-2/4 left-3 -translate-y-2/4 pt-0.5"
                    >
                      {cuaca || "Pilih Cuaca"}
                    </span>
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`absolute top-2/4 right-2 grid h-5 w-5 -translate-y-2/4 place-items-center pt-px text-blue-gray-400 transition-all
                        ${
                          openCuaca ? "mt-px rotate-180" : "rotate-0"
                        } duration-200`}
                    />
                  </div>
                  {openCuaca && (
                    <ul className="absolute top-[49px] left-0 z-[100] max-h-96 w-full origin-center transform-none overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 opacity-100 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                      {weathersData.map(({ value, label }) => (
                        <li
                          key={value}
                          value={value}
                          onClick={onClickCuaca(value)}
                          className="cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 leading-tight outline outline-0 transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900"
                        >
                          {label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative mb-3 w-full">
                <label
                  className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                  htmlFor="grid-password"
                >
                  Arah Angin
                </label>
                <input
                  type="text"
                  className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                  value={arahAngin}
                  onChange={(e) => setArahAngin(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative mb-3 w-full">
                <label
                  className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                  htmlFor="grid-password"
                >
                  Kecepatan Angin
                </label>
                <input
                  type="text"
                  className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                  placeholder="Satuan KM/Jam"
                  value={kecepatanAngin}
                  onChange={(e) => setKecepatanAngin(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative mb-3 w-full">
                <label
                  className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                  htmlFor="grid-password"
                >
                  Suhu
                </label>
                <input
                  type="text"
                  className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                  placeholder="Satuan Derajat Celcius"
                  value={suhu}
                  onChange={(e) => setSuhu(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mr-6 flex-auto bg-[#ffffffe5] pt-10 lg:px-6">
            <div className="flex justify-end gap-4 text-center">
              <Button>
                <Link to={`/dashboard/cuaca1`}>Cancel</Link>
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
  );
}

export default EditCuaca1;
