import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [authType, setAuthType] = useState("");
  const { userEmail, setUserEmail } = useState("");
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("Auth Type: ", authType);
      console.log("Code Response: ", codeResponse);
      console.log("Component: Auth");
      // set the user email to codeResponse.email
      setUserEmail(codeResponse.email);
      console.log("User Email: ", userEmail);
    },
  });

  const onLoginClick = () => {
    setAuthType("login");
    login();
  };

  const onFarmerSignUpClick = () => {
    setAuthType("farmer");
    login();
  };

  const onShopperSignUpClick = () => {
    setAuthType("shopper");
    login();
    navigate("/items");
  };

  return (
    <>
      <div className=" mb-4">Existing Users</div>
      <button
        onClick={onLoginClick}
        className="bg-primary font-body text-lg text-white active:bg-primary/80 px-4 py-2 rounded-2xl"
      >
        Log In
      </button>
      <div className=" mt-8">Create an Account</div>
      <div className=" mb-4 text-base text-black/30">
        Select an account type
      </div>
      <div className="flex flex-row">
        <button
          onClick={onFarmerSignUpClick}
          className="inline-block border text-lg flex-1 border-secondary font-body text-secondary active:bg-secondary/10 px-4 py-2 mr-1 rounded-2xl"
        >
          Farmer
        </button>
        <button
          onClick={onShopperSignUpClick}
          className="inline-block border text-lg flex-1 border-secondary font-body text-secondary active:bg-secondary/10 px-4 py-2 ml-1 rounded-2xl"
        >
          Shopper
        </button>
      </div>
    </>
  );
}
