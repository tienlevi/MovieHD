import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { useForm } from "react-hook-form";
import auth from "../../config/firebase";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Section from "../Section/Section";
import "./style.scss";

function SignIn() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });
  const signInWithGoggle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Section className="form">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-singin-signup">
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors?.email?.type === "required" && <p>Email Validate</p>}
        <input
          type="text"
          {...register("password", { required: true })}
          placeholder="Password"
        />
        {errors?.password?.type === "required" && <p>Password Validate</p>}
        <button type="submit">Sign In</button>
        <div className="form-delimiter">
          <span>Or</span>
        </div>
        <div className="form-icon">
          <div className="form-icon-facebook" onClick={signInWithGoggle}>
            <FacebookIcon style={{ fontSize: 30 }} />
          </div>
          <div className="form-icon-google" onClick={signInWithGoggle}>
            <GoogleIcon style={{ fontSize: 30 }} />
          </div>
        </div>
        <div className="form-link">
          <p>
            Don't have an account ? <Link to="/singup">Sign Up</Link>
          </p>
        </div>
      </form>
    </Section>
  );
}

export default SignIn;
