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

      // set the user email to codeResponse.email
      fetch(BACKEND_HOST + "/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: codeResponse.email,
          addr: userAddress,
          role: authType,
          formID: authType === "farmer" ? "f" : "b",
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
    navigate("/items");
  };

  return (
    <>
      {showModal && (
        <div>
          <label>
            Address:
            <input
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
          </label>
          <button onClick={onModalSubmit}>Submit</button>
        </div>
      )}
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
