import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import { Button } from "@material-tailwind/react";
import { Editor } from "@tinymce/tinymce-react";

export function EditBerita() {
  const [tanggal, setTanggal] = useState(null);
  const [judul, setJudul] = useState("");
  const [content, setContent] = useState("");
  const [gambar, setGambar] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  //GET METHOD
  useEffect(() => {
    const getBeritaById = async () => {
      const response = await axios.get(`http://localhost:5000/berita/${id}`);
      setJudul(response.data.judul);
      setContent(response.data.isi);
      setGambar(response.data.gambar);
      setPreview(response.data.url);
    };

    getBeritaById();
  }, [id]);

  //POST METHOD
  const updateGallery = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("isi", content);
    formData.append("gambar", gambar);
    try {
      await axios.patch(`http://localhost:5000/berita/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/dashboard/berita");
    } catch (error) {
      console.log(error);
    }
  };

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
  return (
    <div>
      <div className="bg-blueGray-100 relative mx-auto my-5 flex max-w-full flex-col break-words rounded-md border-t-[6px] border-t-cyan-500 shadow-lg">
        <div className="mb-0 rounded-t border-b-[1px] border-b-gray-300 bg-white p-2">
          <div className="flex justify-between text-center">
            <h6 className="text-blueGray-700 text-xl">Form Input Berita</h6>
          </div>
        </div>
        <div className="flex-auto bg-[#ffffffe5] px-4 py-10 pt-0 lg:px-6">
          <form onSubmit={updateGallery}>
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
                    value={content}
                    onEditorChange={handleEditorChange}
                    init={{
                      menubar: false,
                      plugins:
                        "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
                      toolbar:
                        "undo redo | blocks | bold italic underline | align | checklist numlist bullist indent outdent",
                      tinycomments_mode: "embedded",
                      tinycomments_author: "Author name",
                      mergetags_list: [
                        { value: "First.Name", title: "First Name" },
                        { value: "Email", title: "Email" },
                      ],
                      ai_request: (request, respondWith) =>
                        respondWith.string(() =>
                          Promise.reject("See docs to implement AI Assistant")
                        ),
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
                    ** Size gambar maksimal 2Mb
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
                <Button>
                  <Link to={`/dashboard/berita`}>Cancel</Link>
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

export default EditBerita;
