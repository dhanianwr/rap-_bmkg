import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { weathersData, wisataData } from "@/data";
import { WisataBesok, WisataSekarang } from "@/widgets/cards";

export function Wisata() {
  const [name, setName] = useState("");
  const [weather, setWeather] = useState("");
  const [wind, setWind] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wave, setWave] = useState("");

  const [nameB, setNameB] = useState("");
  const [weatherB, setWeatherB] = useState("");
  const [windB, setWindB] = useState("");
  const [tempB, setTempB] = useState("");
  const [humidityB, setHumidityB] = useState("");
  const [waveB, setWaveB] = useState("");
  const navigate = useNavigate();

  //POST METHOD HARI INI
  const saveWisata = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/wisata", {
      name: name,
      weather: weather,
      wind: wind,
      temp: temp,
      humidity: humidity,
      wave: wave,
    });
    navigate("/dashboard/wisata");
  };

  //WISATA EVENTS HARI INI
  const [openWisata, setOpenWisata] = useState(false);

  const onClickWisata = (value) => () => {
    setName(value);
    setOpenWisata(false);
  };

  //CUACA EVENTS HARI INI
  const [openWeather, setOpenWeather] = useState(false);

  const onClickCuaca = (value) => () => {
    setWeather(value);
    setOpenWeather(false);
  };

  //POST METHOD BESOK
  const saveWisataB = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/besok", {
      name: nameB,
      weather: weatherB,
      wind: windB,
      temp: tempB,
      humidity: humidityB,
      wave: waveB,
    });
    navigate("/dashboard/wisata");
  };

  //WISATA EVENTS BESOK
  const [openWisataB, setOpenWisataB] = useState(false);

  const onClickWisataB = (value) => () => {
    setNameB(value);
    setOpenWisataB(false);
  };

  //CUACA EVENTS BESOK
  const [openWeatherB, setOpenWeatherB] = useState(false);

  const onClickCuacaB = (value) => () => {
    setWeatherB(value);
    setOpenWeatherB(false);
  };

  return (
    <div>
      <div className="bg-blueGray-100 relative mx-auto my-5 flex max-w-full flex-col break-words rounded-md border-t-[6px] border-t-cyan-500 shadow-lg">
        <div className="mb-0 rounded-t border-b border-b-gray-300 bg-white p-2 pl-5">
          <div className="flex justify-between text-center">
            <h6 className="text-blueGray-700 text-xl">
              Input Data Tempat Wisata
            </h6>
          </div>
        </div>
        <div className="flex-auto bg-[#ffffffe5] px-4 pb-5 lg:px-6">
          <div className="mt-6 flex flex-row">
            <div className="basis-1/2">
              <div className="flex justify-between pb-5 text-center">
                <h6 className="text-blueGray-700 text-xl">
                  Prakiraan Hari Ini
                </h6>
              </div>
              <form onSubmit={saveWisata}>
                <div className="w-full px-4">
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-3 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      Tourism Site
                    </label>
                    <div className="relative h-10 w-full min-w-[200px]">
                      <div
                        onClick={() => setOpenWisata(!openWisata)}
                        className={`peer w-full rounded-[7px] border bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${
                          openWisata
                            ? "border-blue-500"
                            : "border-blue-gray-200 "
                        } h-11 text-center`}
                      >
                        <span
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="absolute top-2/4 left-3 -translate-y-2/4 pt-0.5"
                        >
                          {name || "Pilih Tempat Wisata"}
                        </span>
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`absolute top-2/4 right-2 grid h-5 w-5 -translate-y-2/4 place-items-center pt-px text-blue-gray-400 transition-all
                        ${
                          openWisata ? "mt-px rotate-180" : "rotate-0"
                        } duration-200`}
                        />
                      </div>
                      {openWisata && (
                        <ul className="absolute top-[49px] left-0 z-[100] max-h-96 w-full origin-center transform-none overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 opacity-100 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                          {wisataData.map(({ value, label }) => (
                            <li
                              key={value}
                              value={value}
                              onClick={onClickWisata(value)}
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
                <div className="w-full px-4">
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-3 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      Cuaca
                    </label>
                    <div className="relative h-10 w-full min-w-[200px]">
                      <div
                        onClick={() => setOpenWeather(!openWeather)}
                        className={`peer w-full rounded-[7px] border bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${
                          openWeather
                            ? "border-blue-500"
                            : "border-blue-gray-200 "
                        } h-11 text-center`}
                      >
                        <span
                          value={weather}
                          onChange={(e) => setWeather(e.target.value)}
                          className="absolute top-2/4 left-3 -translate-y-2/4 pt-0.5"
                        >
                          {weather || "Pilih Cuaca"}
                        </span>
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`absolute top-2/4 right-2 grid h-5 w-5 -translate-y-2/4 place-items-center pt-px text-blue-gray-400 transition-all
                        ${
                          openWeather ? "mt-px rotate-180" : "rotate-0"
                        } duration-200`}
                        />
                      </div>
                      {openWeather && (
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
                <div className="w-full px-4">
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      Wind
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                      value={wind}
                      onChange={(e) => setWind(e.target.value)}
                      placeholder="Masukkan Kecepatan Angin"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      Temperature
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                      value={temp}
                      onChange={(e) => setTemp(e.target.value)}
                      placeholder="Masukkan Temperatur"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      Humidity
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                      value={humidity}
                      onChange={(e) => setHumidity(e.target.value)}
                      placeholder="Masukkan Kelembapan"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      Wave Height
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                      value={wave}
                      onChange={(e) => setWave(e.target.value)}
                      placeholder="Masukkan Ketinggian Gelombang"
                    />
                  </div>
                </div>
                <div className="w-full px-4 pt-5">
                  <div className="relative mb-3 w-full">
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
            <div className="basis-1/2">
              <div className="flex justify-between pb-5 text-center">
                <h6 className="text-blueGray-700 text-xl">Prakiraan Besok</h6>
              </div>
              <form onSubmit={saveWisataB}>
                <div className="w-full px-4">
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-3 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      Tourism Site
                    </label>
                    <div className="relative h-10 w-full min-w-[200px]">
                      <div
                        onClick={() => setOpenWisataB(!openWisataB)}
                        className={`peer w-full rounded-[7px] border bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${
                          openWisataB
                            ? "border-blue-500"
                            : "border-blue-gray-200 "
                        } h-11 text-center`}
                      >
                        <span
                          value={nameB}
                          onChange={(e) => setNameB(e.target.value)}
                          className="absolute top-2/4 left-3 -translate-y-2/4 pt-0.5"
                        >
                          {nameB || "Pilih Tempat Wisata"}
                        </span>
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`absolute top-2/4 right-2 grid h-5 w-5 -translate-y-2/4 place-items-center pt-px text-blue-gray-400 transition-all
                        ${
                          openWisataB ? "mt-px rotate-180" : "rotate-0"
                        } duration-200`}
                        />
                      </div>
                      {openWisataB && (
                        <ul className="absolute top-[49px] left-0 z-[100] max-h-96 w-full origin-center transform-none overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 opacity-100 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                          {wisataData.map(({ value, label }) => (
                            <li
                              key={value}
                              value={value}
                              onClick={onClickWisataB(value)}
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
                <div className="w-full px-4">
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-3 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      Cuaca
                    </label>
                    <div className="relative h-10 w-full min-w-[200px]">
                      <div
                        onClick={() => setOpenWeatherB(!openWeatherB)}
                        className={`peer w-full rounded-[7px] border bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${
                          openWeatherB
                            ? "border-blue-500"
                            : "border-blue-gray-200 "
                        } h-11 text-center`}
                      >
                        <span
                          value={weatherB}
                          onChange={(e) => setWeatherB(e.target.value)}
                          className="absolute top-2/4 left-3 -translate-y-2/4 pt-0.5"
                        >
                          {weatherB || "Pilih Cuaca"}
                        </span>
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`absolute top-2/4 right-2 grid h-5 w-5 -translate-y-2/4 place-items-center pt-px text-blue-gray-400 transition-all
                        ${
                          openWeatherB ? "mt-px rotate-180" : "rotate-0"
                        } duration-200`}
                        />
                      </div>
                      {openWeatherB && (
                        <ul className="absolute top-[49px] left-0 z-[100] max-h-96 w-full origin-center transform-none overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 opacity-100 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                          {weathersData.map(({ value, label }) => (
                            <li
                              key={value}
                              value={value}
                              onClick={onClickCuacaB(value)}
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
                <div className="w-full px-4">
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      Wind
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                      value={windB}
                      onChange={(e) => setWindB(e.target.value)}
                      placeholder="Masukkan Kecepatan Angin"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      Temperature
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                      value={tempB}
                      onChange={(e) => setTempB(e.target.value)}
                      placeholder="Masukkan Temperatur"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      Humidity
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                      value={humidityB}
                      onChange={(e) => setHumidityB(e.target.value)}
                      placeholder="Masukkan Kelembapan"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="grid-password"
                    >
                      Wave Height
                    </label>
                    <input
                      type="text"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                      value={waveB}
                      onChange={(e) => setWaveB(e.target.value)}
                      placeholder="Masukkan Ketinggian Gelombang"
                    />
                  </div>
                </div>
                <div className="w-full px-4 pt-5">
                  <div className="relative mb-3 w-full">
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
      </div>

      <div className="bg-blueGray-100 relative mx-auto my-5 flex max-w-full flex-col break-words rounded-md border-t-[6px] border-t-cyan-500 shadow-lg">
        <WisataSekarang />
        <WisataBesok />
      </div>
    </div>
  );
}

export default Wisata;
