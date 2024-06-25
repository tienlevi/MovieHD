import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { auth } from "../../config/firebase";
import { getUser, addUser } from "../../config/action";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Section from "../Section/Section";
import "./style.scss";

function SignIn() {
  const location = useLocation();
  const { user } = useAuth();
  const [data, setData] = useState<any>([]);

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  useEffect(() => {
    const getData = async () => {
      const response = await getUser();
      setData(response);
    };
    getData();
  }, []);

  const signInWithGoggle = async () => {
    try {
      const { user, _tokenResponse }: any = await signInWithPopup(
        auth,
        new GoogleAuthProvider()
      );

      const { displayName, email, photoURL, uid } = user;
      const checkUser = data.find((item: any) => item.uid === uid);
      if (!checkUser) {
        await addUser({ displayName, email, photoURL, uid });
      }
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
      console.log(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  if (user) {
    navigate("/");
  }

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
          <div className="form-icon-facebook" onClick={signInWithFacebook}>
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
