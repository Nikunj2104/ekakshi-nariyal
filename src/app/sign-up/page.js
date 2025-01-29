"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import API from "../../../utils/axios";

const Signup = () => {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/sign-up", form);
      router.push("/sign-in");
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
          Sign Up
        </Button>
      </form>

      {/* Sign In Option */}
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        marginTop={2}
      >
        Already have an account?{" "}
        <Link href="/sign-in" passHref>
          <Button variant="text" color="primary" sx={{ textTransform: "none" }}>
            Sign In
          </Button>
        </Link>
      </Typography>
    </Container>
  );
};

export default Signup;
