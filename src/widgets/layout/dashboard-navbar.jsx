//Gak Penting
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";

export function DashboardNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/auth/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar
      color="transparent"
      className={"rounded-xl px-0 py-1 transition-all"}
      fullWidth
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Button size="sm" variant="text">
            <span>Log In</span>
          </Button>
          <Menu
            open={isMenuOpen}
            handler={setIsMenuOpen}
            placement="bottom-end"
          >
            <MenuHandler>
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
              >
                <UserCircleIcon className="h-8 w-8"/>
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-3 w-3 transition-transform ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </MenuHandler>
            <MenuList className="p-1">
              <MenuItem
                key="My Profile"
                onClick={closeMenu}
                className="flex items-center gap-2 rounded"
              >
                <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color="inherit"
                >
                  Hello {name}
                </Typography>
              </MenuItem>
              <MenuItem
                key="Edit Profile"
                onClick={closeMenu}
                className="flex items-center gap-2 rounded"
              >
                <Cog6ToothIcon strokeWidth={2} className="h-4 w-4" />
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color="inherit"
                >
                  Edit Profile
                </Typography>
              </MenuItem>
              <MenuItem
                key="Sign Out"
                onClick={Logout}
                className="active:bg-red-500/1 flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10"
              >
                <PowerIcon strokeWidth={2} className="h-4 w-4 text-red-500" />
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color="red"
                >
                  Sign Out
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
