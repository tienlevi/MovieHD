import SignUp from "../components/Form/SignUp";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";

function SignUpPage() {
  return (
    <Title title="Sign Up">
      <Header />
      <SignUp />
      <Footer />
    </Title>
  );
}

export default SignUpPage;
