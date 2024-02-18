import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_HOST } from "../.config.js";

export default function Auth() {
  const [authType, setAuthType] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [readyToNavigate, setReadyToNavigate] = useState(false);

  const getEmail = async (accessToken) => {
    console.log("Access Token: ", accessToken);
    fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // The full user profile information
        setUserEmail(data.email);
      })
      .catch((error) =>
        console.error("Error fetching user information:", error)
      );
  };

  const login = useGoogleLogin({
    isSignedIn: true,
    accessType: "offline",
    scope: "email profile",
    onSuccess: (codeResponse) => {
      getEmail(codeResponse.access_token);

      navigate("/items");

      // set the user email to codeResponse.email
      fetch(BACKEND_HOST + "/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          addr: userAddress,
          role: authType === "farmer" ? "f" : "b",
          farmId: 0,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
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
    setShowModal(true);
  };

  const onModalSubmit = () => {
    setShowModal(false);
    login();
  };

  return (
    <>
      {showModal && (
        <div className="fixed z-10 text-center left-[-41px] top-[-257px] h-screen w-screen bg-black/70">
          <div className="flex flex-col mx-auto mt-36 border rounded-2xl h-[60%] w-[60%] bg-background">
            <div className="text-xl font-bold w-[80%] mx-auto mt-4 mb-6">
              Enter your address to continue
            </div>
            <label className="text-black/40 text-lg">Address:</label>
            <input
              className="w-[80%] mx-auto border-2 border-black/20 rounded-2xl h-10 px-5 pr-16 text-sm text-background focus:outline-none"
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
            <button
              onClick={onModalSubmit}
              className="mt-8 mx-auto w-[80%] bg-primary active:bg-primary/80 text-white py-2 text-lg rounded-2xl"
            >
              Submit
            </button>
            <button
              className="text-base test-primary/50 mt-4"
              onClick={() => {
                setShowModal(false);
              }}
            >
              {"\u2190"} Back
            </button>
          </div>
        </div>
      )}
      <div
        className={showModal ? "opacity-30" : ""}
      // onClick={(event) => {
      //   if (event.target === event.currentTarget) {
      //     setShowModal(false);
      //   }
      // }}
      >
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
      </div>
    </>
  );
}
