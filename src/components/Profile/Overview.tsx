import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import useAuthStageChange from "../../hooks/useAuthStageChange";
import { auth } from "../../config/firebase";
import { useState, useEffect } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "./SideBar";
import { imageSrc } from "../../constants";
import { deleteFavoriteMovie, getFavoriteMovie } from "../../config/action";
import Favorite from "./Favorite";
import "./style.scss";

function Overview() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [favoriteMovie, setFavoriteMovie] = useState<any>([]);
  const { user, setUser } = useAuthStageChange();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response: any = await getFavoriteMovie(user?.uid);
      setFavoriteMovie(response);
    };
    getData();
  }, [user.uid]);

  const LogOut = async () => {
    try {
      setUser({});
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const removeFavoriteMovie = async (id: string) => {
    await deleteFavoriteMovie(id);
    const remove = favoriteMovie.filter((item: any) => item.id !== id);
    setFavoriteMovie(remove);
    toast.success("Delete success");
    return remove;
  };

  return (
    <>
      <ToastContainer />
      <header className="header-profile">
        <div className="header-profile-icon" onClick={handleToggle}>
          <MenuRoundedIcon />
        </div>
        <Link to="/">
          <img
            src={imageSrc.logo}
            alt=""
            width={60}
            height={60}
            style={{ objectFit: "contain" }}
          />
          <img
            src={imageSrc.logoName}
            alt=""
            width={125}
            height={60}
            style={{ objectFit: "cover", marginLeft: 8 }}
          />
        </Link>
      </header>
      <SideBar active={toggle} />
      <main>
        <div className="overview-profile">
          <h1>Home</h1>
          <img src={user?.photoURL} alt="" />
          <p>Name: {user?.displayName}</p>
          <p>Email: {user?.email}</p>
          <div className="overview-profile-btn" onClick={LogOut}>
            <p>Đăng xuất</p>
          </div>
        </div>
        <div className="favorite-movie">
          <h1>Favorite Movies</h1>
          <Favorite lists={favoriteMovie} handleRemove={removeFavoriteMovie} />
        </div>
      </main>
    </>
  );
}

export default Overview;
