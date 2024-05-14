import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { mutate } from "swr";
import DOMPurify from "dompurify";
import {
  Button,
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { Editor } from "@tinymce/tinymce-react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const TABLE_HEAD = ["ID", "Judul", "Tanggal", "Isi", "Gambar", "Action"];

export function Berita() {
  const [tanggal, setTanggal] = useState(null);
  const [judul, setJudul] = useState("");
  const [content, setContent] = useState("");
  const [gambar, setGambar] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  //GET METHOD
  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/berita");
    return response.data;
  };
  const { data } = useSWR("berita", fetcher);

  //POST METHOD
  const createBerita = async (e) => {
    let fixDate = tanggal.toISOString();
    e.preventDefault();
    const formData = new FormData();
    formData.append("tanggal", fixDate);
    formData.append("judul", judul);
    formData.append("isi", content);
    formData.append("gambar", gambar);
    try {
      await axios.post("http://localhost:5000/berita", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/dashboard/berita");
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE METHOD
  const deleteBerita = async (beritaId) => {
    await axios.delete(`http://localhost:5000/berita/${beritaId}`);
    mutate("berita");
  };

  //TANGGAL EVENT
  let newTanggal = moment(tanggal).format("DD-MM-YYYY");

  // TinyMCE EVENT
  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  //IMAGE EVENT
  const loadImage = (e) => {
    const image = e.target.files[0];
    setGambar(image);
    setPreview(URL.createObjectURL(image));
  };

  if (!data) return console.log("Error");
  return (
    <div>
      <div className="bg-blueGray-100 relative mx-auto my-5 flex max-w-full flex-col break-words rounded-md border-t-[6px] border-t-cyan-500 shadow-lg">
        <div className="mb-0 rounded-t border-b-[1px] border-b-gray-300 bg-white p-2">
          <div className="flex justify-between text-center">
            <h6 className="text-blueGray-700 text-xl">Form Input Berita</h6>
          </div>
        </div>
        <div className="flex-auto bg-[#ffffffe5] px-4 py-10 pt-0 lg:px-6">
          <form onSubmit={createBerita}>
            <div className="mt-6 flex flex-wrap">
              <div className="w-full px-4">
                <div className="relative mb-3 w-full">
                  <label
                    className="text-blueGray-600 mb-2 block text-sm font-bold"
                    htmlFor="grid-password"
                  >
                    Tanggal
                  </label>
                  <DatePicker
                    dateFormat="dd-MM-yyyy"
                    className="z-[100] w-full rounded bg-white px-3 py-3 text-sm shadow ring-cyan-600 focus:outline-none focus:ring-2"
                    selected={tanggal}
                    onChange={(date) => setTanggal(date)}
                    placeholderText="Masukkan Tanggal"
                  />
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative mb-3 w-full">
                  <label
                    className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                    htmlFor="grid-password"
                  >
                    Judul Berita
                  </label>
                  <input
                    type="text"
                    className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow ring-cyan-600 transition-all duration-150 ease-linear focus:outline-none focus:ring-2"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative mb-3 w-full">
                  <label
                    className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                    htmlFor="grid-password"
                  >
                    Isi Berita
                  </label>
                  <Editor
                    apiKey="l2f0db8ozt5uws06llfzcgbidwjl5snn5pmtqnp683uuozgo"
                    initialValue="Masukkan isi Berita"
                    onEditorChange={handleEditorChange}
                    init={{
                      menubar: false,
                      plugins:
                        "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
                      toolbar:
                        "undo redo | blocks | bold italic underline | align | checklist numlist bullist indent outdent",
                    }}
                  />
                </div>
              </div>
              <div className="w-full px-4">
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
                      className="h-48 w-48 object-cover pt-2"
                    />
                  ) : (
                    ""
                  )}
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
            <h6 className="text-blueGray-700 pl-5 text-xl">Data Berita</h6>
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
              <tbody className="">
                {data.map((berita, index) => {
                  var newTanggal = new Date(berita.tanggal).toLocaleDateString(
                    "en-GB"
                  );
                  return (
                    <tr
                      key={berita.id}
                      className="h-20 even:bg-blue-gray-50/50"
                    >
                      <td className="w-[50px] p-4 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td className="w-[200px] p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {berita.judul}
                        </Typography>
                      </td>
                      <td className=" w-[150px] p-4 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {newTanggal}
                        </Typography>
                      </td>
                      <td className="w-[350px] p-4">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(berita.isi.substring(0, 30)),
                          }}
                        ></div>
                      </td>
                      <td className="flex items-center justify-center p-4">
                        <img
                          src={berita.url}
                          alt={berita.title}
                          className="h-32 w-32 object-cover"
                        />
                      </td>
                      <td className="w-[150px] p-4 text-center">
                        <Link to={`/dashboard/editBerita/${berita.id}`}>
                          <Tooltip content="Edit">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4 rounded text-[#1DA1F2] hover:shadow-[#1DA1F2]/20 focus:shadow-[#1DA1F2]/20 active:shadow-[#1DA1F2]/10" />
                            </IconButton>
                          </Tooltip>
                        </Link>

                        <Tooltip content="Delete">
                          <IconButton
                            onClick={() => deleteBerita(berita.id)}
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

export default Berita;
