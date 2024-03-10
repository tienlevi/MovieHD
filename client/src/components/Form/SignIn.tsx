import { useState } from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import Section from "../Section/Section";
import "./style.scss";

function SignIn() {
  const [username, setUsername] = useState<string>("");
  return (
    <Section className="form">
      <h1>Sign In</h1>
      <form className="form-singin-signup">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
        <div className="form-delimiter">
          <span>Or</span>
        </div>
        <div className="form-icon">
          <div className="form-icon-item">
            <FacebookIcon style={{ fontSize: 30 }} />
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
