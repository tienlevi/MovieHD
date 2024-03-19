import SignIn from "../components/Form/SignIn";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";

function SignInPage() {
  return (
    <Title title="Sign In">
      <Header />
      <SignIn />
      <Footer />
    </Title>
  );
}

export default SignInPage;
