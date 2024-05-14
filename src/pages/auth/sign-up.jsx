import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export function SignUp() {
  const [name, setName] = useState("");
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        nip: nip,
        password: password,
        confPassword: confPassword,
      });
      navigate("/auth/sign-in");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <>
      <img
        src="../../../img/bg-login.png"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
            <p className="text-center">{msg}</p>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <form onSubmit={Register} className="space-y-5">
              <Input
                label="Name"
                size="lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                label="NIM"
                size="lg"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
              />
              <Input
                type="password"
                label="Password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                label="Confirm Password"
                size="lg"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
              <Button type="submit" fullWidth className="mt-10">
                Sign Up
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
