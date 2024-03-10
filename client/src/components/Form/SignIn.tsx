import { useState } from "react";
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
      </form>
    </Section>
  );
}

export default SignIn;
