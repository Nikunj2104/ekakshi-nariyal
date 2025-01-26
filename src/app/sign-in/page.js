"use client";

import Link from "next/link";
import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import API from "../../../utils/axios";

const Signin = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/sign-in", form);
      localStorage.setItem("token", data.token);
      alert("Login successful");
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ textTransform: "none", mt: 2 }}
        >
          Sign In
        </Button>
      </form>

      {/* Sign Up Option */}
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        marginTop={2}
      >
        Don't have an account?{" "}
        <Link href="/sign-up" passHref>
          <Button variant="text" color="primary" sx={{ textTransform: "none" }}>
            Sign Up
          </Button>
        </Link>
      </Typography>
    </Container>
  );
};

export default Signin;
