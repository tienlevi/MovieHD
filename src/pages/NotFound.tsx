import { Link } from "react-router-dom";
import Title from "../components/Title/Title";
import "../index.scss";

function NotFound() {
  return (
    <Title title="404 Not Found">
      <div className="not-found">
        <h1 className="text-[20rem] text-white font-bold">404</h1>
        <p className="text-[30px] text-white mt-[-36px]">Page Not Found</p>
        <Link
          className="flex items-center justify-center text-[22px] w-[300px] h-[50px] mx-auto mt-5 bg-bluesecond text-white rounded-[5px]"
          to="/"
        >
          Back to home
        </Link>
      </div>
    </Title>
  );
}

export default NotFound;
