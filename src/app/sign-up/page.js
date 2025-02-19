"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import API from "../../../utils/axios";

const Signup = () => {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/sign-up", form);
      router.push("/sign-in");
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
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
          disabled={loading}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          disabled={loading}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          disabled={loading}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ textTransform: "none", mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Sign Up"}
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
