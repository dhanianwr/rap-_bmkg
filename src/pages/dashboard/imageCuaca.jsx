import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import {
  AnalisisCurahHujan,
  AnalisisSifatHujan,
  CuacaBesok,
  HariIni,
  HariTanpaHujan,
  NormalMusim,
  PrakiraanCurahHujan,
} from "@/widgets/cards";
import { Link } from "react-router-dom";

const TABLE_HEAD = [
  "ID",
  "CUACA HARI INI",
  "CUACA LUSA",
  "ANALISIS CURAH HUJAN",
  "ANALISIS SIFAT HUJAN",
  "PRAKIRAAN CURAH HUJAN",
  "HARI TANPA HUJAN",
  "NORMAL MUSIM",
];

export function ImageCuaca() {
  const [imagesHI, setImageHI] = useState([]);
  const [imagesBO, setImageBO] = useState([]);
  const [imagesACH, setImageACH] = useState([]);
  const [imagesASH, setImageASH] = useState([]);
  const [imagesPCH, setImagePCH] = useState([]);
  const [imagesHTH, setImageHTH] = useState([]);
  const [imagesNM, setImageNM] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getImageHI();
    getImageBO();
    getImageACH();
    getImageASH();
    getImagePCH();
    getImageHTH();
    getImageNM();
  }, []);

  const getImageHI = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cuacahariini");
      setImageHI(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getImageBO = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cuacabesok");
      setImageBO(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getImageACH = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/analisisCurahHujan"
      );
      setImageACH(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getImageASH = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/analisisSifatHujan"
      );
      setImageASH(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getImagePCH = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/prakiraanCurahHujan"
      );
      setImagePCH(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getImageHTH = async () => {
    try {
      const response = await axios.get("http://localhost:5000/hariTanpaHujan");
      setImageHTH(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getImageNM = async () => {
    try {
      const response = await axios.get("http://localhost:5000/normalMusim");
      setImageNM(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  //DELETE METHOD
  const deleteImageHI = async (buletinId) => {
    await axios.delete(`http://localhost:5000/cuacahariini/${buletinId}`);
    mutate("cuacahariini");
  };

  const deleteImageBO = async (buletinId) => {
    await axios.delete(`http://localhost:5000/cuacabesok/${buletinId}`);
    mutate("cuacabesok");
  };

  const deleteImageACH = async (buletinId) => {
    await axios.delete(`http://localhost:5000/analisisCurahHujan/${buletinId}`);
    mutate("analisisCurahHujan");
  };

  const deleteImageASH = async (buletinId) => {
    await axios.delete(`http://localhost:5000/analisisSifatHujan/${buletinId}`);
    mutate("analisisSifatHujan");
  };

  const deleteImagePCH = async (buletinId) => {
    await axios.delete(
      `http://localhost:5000/prakiraanCurahHujan/${buletinId}`
    );
    mutate("prakiraanCurahHujan");
  };

  const deleteImageHTH = async (buletinId) => {
    await axios.delete(`http://localhost:5000/hariTanpaHujan/${buletinId}`);
    mutate("hariTanpaHujan");
  };

  const deleteImageNM = async (buletinId) => {
    await axios.delete(`http://localhost:5000/normalMusim/${buletinId}`);
    mutate("normalMusim");
  };

  return (
    <div>
      <div className="bg-blueGray-100 relative mx-auto my-5 flex max-w-full flex-col break-words rounded-md border-t-[6px] border-t-cyan-500 shadow-lg">
        <div className="mb-0 rounded-t border-b-[1px] border-b-gray-300 bg-white p-2">
          <div className="flex justify-between text-center">
            <h6 className="text-blueGray-700 pl-5 text-xl">Input Info Iklim</h6>
          </div>
        </div>
        <div className="flex-auto bg-[#ffffffe5] px-4 py-10 pt-0 lg:px-6">
          <div className="mt-6 flex-col">
            <HariIni />
            <CuacaBesok />
            <AnalisisCurahHujan />
            <AnalisisSifatHujan />
            <PrakiraanCurahHujan />
            <HariTanpaHujan />
            <NormalMusim />
          </div>
        </div>
      </div>

      <div className="bg-blueGray-100 relative mx-auto my-5 flex max-w-full flex-col break-words rounded-md border-t-[6px] border-t-cyan-500 shadow-lg">
        <div className="mb-0 rounded-t border-b-[1px] border-b-gray-300 bg-white p-2">
          <div className="flex justify-between text-center">
            <h6 className="text-blueGray-700 pl-5 text-xl">Data Cuaca</h6>
          </div>
        </div>
        <div className="flex-auto bg-[#ffffffe5] lg:px-6">
          <div id="HI">
            <div className="flex justify-between pb-4 text-center">
              <h4 className="mt-5 mb-2 rounded-b border-b-4 border-b-cyan-400 text-lg">
                Cuaca Hari Ini
              </h4>
            </div>
            <div className="mb-5 flex h-full w-full flex-row gap-7">
              {imagesHI.map((cuacaHI, index) => {
                return (
                  <Card
                    className="h-96 w-48 border-r-2 border-b-2"
                    key={cuacaHI.id}
                  >
                    <CardHeader shadow={false} floated={false} className="h-96">
                      <img
                        src={cuacaHI.url}
                        alt={cuacaHI.title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody>
                      <div className="mb-2 flex items-center justify-between">
                        <Typography color="blue-gray" className="font-medium">
                          {cuacaHI.name}
                        </Typography>
                      </div>
                    </CardBody>
                    <CardFooter className="flex flex-row gap-2 self-center pt-0">
                      <a href={`/dashboard/editCuacaHariIni/${cuacaHI.id}`}>
                        <Button className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                          Edit
                        </Button>
                      </a>
                      <Button
                        color="red"
                        onClick={() => deleteImageHI(cuacaHI.id)}
                        className=" shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                      >
                        Hapus
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
          <div id="BO">
            <div className="flex justify-between pb-4 text-center">
              <h4 className="mt-5 mb-2 rounded-b border-b-4 border-b-cyan-400 text-lg">
                Cuaca Besok
              </h4>
            </div>
            <div className="mb-5 flex h-full w-full flex-row gap-7">
              {imagesBO.map((cuacaBO, index) => {
                return (
                  <Card
                    className="h-96 w-48 border-r-2 border-b-2"
                    key={cuacaBO.id}
                  >
                    <CardHeader shadow={false} floated={false} className="h-96">
                      <img
                        src={cuacaBO.url}
                        alt={cuacaBO.title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody>
                      <div className="mb-2 flex items-center justify-between">
                        <Typography color="blue-gray" className="font-medium">
                          {cuacaBO.name}
                        </Typography>
                      </div>
                    </CardBody>
                    <CardFooter className="flex flex-row gap-2 self-center pt-0">
                      <a href={`/dashboard/editCuacaBesok/${cuacaBO.id}`}>
                        <Button className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                          Edit
                        </Button>
                      </a>
                      <Button
                        color="red"
                        onClick={() => deleteImageBO(cuacaBO.id)}
                        className=" shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                      >
                        Hapus
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
          <div id="ACH">
            <div className="flex justify-between pb-4 text-center">
              <h4 className="mt-5 mb-2 rounded-b border-b-4 border-b-cyan-400 text-lg">
                Analisis Curah Hujan
              </h4>
            </div>
            <div className="mb-5 flex h-full w-full flex-row gap-7">
              {imagesACH.map((cuacaACH, index) => {
                return (
                  <Card
                    className="h-96 w-48 border-r-2 border-b-2"
                    key={cuacaACH.id}
                  >
                    <CardHeader shadow={false} floated={false} className="h-96">
                      <img
                        src={cuacaACH.url}
                        alt={cuacaACH.title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody>
                      <div className="mb-2 flex items-center justify-between">
                        <Typography color="blue-gray" className="font-medium">
                          {cuacaACH.name}
                        </Typography>
                      </div>
                    </CardBody>
                    <CardFooter className="flex flex-row gap-2 self-center pt-0">
                      <a
                        href={`/dashboard/editAnalisisCurahHujan/${cuacaACH.id}`}
                      >
                        <Button className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                          Edit
                        </Button>
                      </a>
                      <Button
                        color="red"
                        onClick={() => deleteImageACH(cuacaACH.id)}
                        className=" shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                      >
                        Hapus
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
          <div id="ASH">
            <div className="flex justify-between pb-4 text-center">
              <h4 className="mt-5 mb-2 rounded-b border-b-4 border-b-cyan-400 text-lg">
                Analisis Sifat Hujan
              </h4>
            </div>
            <div className="mb-5 flex h-full w-full flex-row gap-7">
              {imagesASH.map((cuacaASH, index) => {
                return (
                  <Card
                    className="h-96 w-48 border-r-2 border-b-2"
                    key={cuacaASH.id}
                  >
                    <CardHeader shadow={false} floated={false} className="h-96">
                      <img
                        src={cuacaASH.url}
                        alt={cuacaASH.title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody>
                      <div className="mb-2 flex items-center justify-between">
                        <Typography color="blue-gray" className="font-medium">
                          {cuacaASH.name}
                        </Typography>
                      </div>
                    </CardBody>
                    <CardFooter className="flex flex-row gap-2 self-center pt-0">
                      <a
                        href={`/dashboard/editAnalisisSifatHujan/${cuacaASH.id}`}
                      >
                        <Button className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                          Edit
                        </Button>
                      </a>
                      <Button
                        color="red"
                        onClick={() => deleteImageASH(cuacaASH.id)}
                        className=" shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                      >
                        Hapus
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
          <div id="PCH">
            <div className="flex justify-between pb-4 text-center">
              <h4 className="mt-5 mb-2 rounded-b border-b-4 border-b-cyan-400 text-lg">
                Prakiraan Curah Hujan
              </h4>
            </div>
            <div className="mb-5 flex h-full w-full flex-row gap-7">
              {imagesPCH.map((cuacaPCH, index) => {
                return (
                  <Card
                    className="h-96 w-48 border-r-2 border-b-2"
                    key={cuacaPCH.id}
                  >
                    <CardHeader shadow={false} floated={false} className="h-96">
                      <img
                        src={cuacaPCH.url}
                        alt={cuacaPCH.title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody>
                      <div className="mb-2 flex items-center justify-between">
                        <Typography color="blue-gray" className="font-medium">
                          {cuacaPCH.name}
                        </Typography>
                      </div>
                    </CardBody>
                    <CardFooter className="flex flex-row gap-2 self-center pt-0">
                      <a
                        href={`/dashboard/editPrakiraanCurahHujan/${cuacaPCH.id}`}
                      >
                        <Button className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                          Edit
                        </Button>
                      </a>
                      <Button
                        color="red"
                        onClick={() => deleteImagePCH(cuacaPCH.id)}
                        className=" shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                      >
                        Hapus
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
          <div id="HTH">
            <div className="flex justify-between pb-4 text-center">
              <h4 className="mt-5 mb-2 rounded-b border-b-4 border-b-cyan-400 text-lg">
                Hari Tanpa Hujan
              </h4>
            </div>
            <div className="mb-5 flex h-full w-full flex-row gap-7">
              {imagesHTH.map((cuacaHTH, index) => {
                return (
                  <Card
                    className="h-96 w-48 border-r-2 border-b-2"
                    key={cuacaHTH.id}
                  >
                    <CardHeader shadow={false} floated={false} className="h-96">
                      <img
                        src={cuacaHTH.url}
                        alt={cuacaHTH.title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody>
                      <div className="mb-2 flex items-center justify-between">
                        <Typography color="blue-gray" className="font-medium">
                          {cuacaHTH.name}
                        </Typography>
                      </div>
                    </CardBody>
                    <CardFooter className="flex flex-row gap-2 self-center pt-0">
                      <a href={`/dashboard/editHariTanpaHujan/${cuacaHTH.id}`}>
                        <Button className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                          Edit
                        </Button>
                      </a>
                      <Button
                        color="red"
                        onClick={() => deleteImageHTH(cuacaHTH.id)}
                        className=" shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                      >
                        Hapus
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
          <div id="NM">
            <div className="flex justify-between pb-4 text-center">
              <h4 className="mt-5 mb-2 rounded-b border-b-4 border-b-cyan-400 text-lg">
                Normal Musim
              </h4>
            </div>
            <div className="mb-5 flex h-full w-full flex-row gap-7">
              {imagesNM.map((cuacaNM, index) => {
                return (
                  <Card
                    className="h-96 w-48 border-r-2 border-b-2"
                    key={cuacaNM.id}
                  >
                    <CardHeader shadow={false} floated={false} className="h-96">
                      <img
                        src={cuacaNM.url}
                        alt={cuacaNM.title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody>
                      <div className="mb-2 flex items-center justify-between">
                        <Typography color="blue-gray" className="font-medium">
                          {cuacaNM.name}
                        </Typography>
                      </div>
                    </CardBody>
                    <CardFooter className="flex flex-row gap-2 self-center pt-0">
                      <a href={`/dashboard/editNormalMusim/${cuacaNM.id}`}>
                        <Button className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                          Edit
                        </Button>
                      </a>
                      <Button
                        color="red"
                        onClick={() => deleteImageNM(cuacaNM.id)}
                        className=" shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                      >
                        Hapus
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCuaca;
