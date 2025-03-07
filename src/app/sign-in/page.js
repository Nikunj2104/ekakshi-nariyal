"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { login } from "@/redux/actions/authActions";
import API from "../../../utils/axios";

const Signin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoggedIn } = useSelector((state) => state.auth); // Access state from Redux

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [router, isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await API.post("/auth/sign-in", form);
      dispatch(login(data.user.name)); // Dispatch the login action with the user's name
      router.push("/");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
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
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Button
          variant="contained"
          type="submit"
          sx={{ textTransform: "none", mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Sign In"}
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
