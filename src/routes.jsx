import { EditCuaca1 } from "./pages/edit/editCuaca1";
import { Gallery } from "./pages/dashboard/gallery";
import { ImageCuaca } from "./pages/dashboard/imageCuaca";
import { Pegawai } from "./pages/dashboard/pegawai";
import { Wisata } from "./pages/dashboard/wisata";
import { Berita } from "./pages/dashboard/berita";
import { EditGallery } from './pages/edit/editGallery';
import { EditBerita } from './pages/edit/editBerita';
import { EditHariIni } from "./pages/edit/editHariIni";
import { EditBesok } from "./pages/edit/editBesok";
import { EditHI } from "./pages/edit/editHI";
import { EditBO } from "./pages/edit/editBO";
import { EditACH } from "./pages/edit/editACH";
import { EditASH } from "./pages/edit/editASH";
import { EditPCH } from "./pages/edit/editPCH";
import { EditHTH } from "./pages/edit/editHTH";
import { EditNM } from "./pages/edit/editNM";
import { Buletin } from "./pages/dashboard/buletin";
import { EditBuletin } from "./pages/edit/editBuletin";

export const routes = [
  { name: "EditCuaca1", path: "/editCuaca1/:id", element: <EditCuaca1 /> },
  { name: "EditBerita", path: "/editBerita/:id", element: <EditBerita /> },
  { name: "EditBuletin", path: "/editBuletin/:id", element: <EditBuletin /> },
  { name: "Gallery", path: "/gallery", element: <Gallery /> },
  { name: "EditGallery", path: "/editGallery/:id", element: <EditGallery /> },
  { name: "EditWisataHariIni", path: "/editWisataHariIni/:id", element: <EditHariIni /> },
  { name: "EditWisataBesok", path: "/editWisataBesok/:id", element: <EditBesok /> },
  { name: "ImageCuaca", path: "/imageCuaca", element: <ImageCuaca /> },
  { name: "Pegawai", path: "/pegawai", element: <Pegawai /> },
  { name: "Wisata", path: "/wisata", element: <Wisata /> },
  { name: "Berita", path: "/berita", element: <Berita /> },
  { name: "Buletin", path: "/buletin", element: <Buletin /> },
  { name: "EditCuacaHariIni", path: "/editCuacaHariIni/:id", element: <EditHI /> },
  { name: "EditCuacaBesok", path: "/editCuacaBesok/:id", element: <EditBO /> },
  { name: "EditAnalisisCurahHujan", path: "/editAnalisisCurahHujan/:id", element: <EditACH /> },
  { name: "EditAnalisisSifatHujan", path: "/editAnalisisSifatHujan/:id", element: <EditASH /> },
  { name: "EditPrakiraanCurahHujan", path: "/editPrakiraanCurahHujan/:id", element: <EditPCH /> },
  { name: "EditHariTanpaHujan", path: "/editHariTanpaHujan/:id", element: <EditHTH /> },
  { name: "EditNormalMusim", path: "/editNormalMusim/:id", element: <EditNM /> },
];

export default routes;
