"use client";
import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { setauthModalState } from "../../Redux/StateSlice";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, GoogleProvider } from "../../config/Firebase";

export default function AuhtUI() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const authContentBox = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handlemodal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    if (target.classList[0] == "Modal-bg") {
      let animation = [
        {
          transform: "translate(0,0rem)",
          opacity: 1,
        },
        {
          transform: "translate(0,-16rem)",
          opacity: 0.3,
        },
        {
          transform: "translate(0,-30rem)",
          opacity: 0.1,
        },
      ];

      authContentBox.current?.animate(animation, { duration: 200 });
      setTimeout(() => {
        dispatch(setauthModalState(false));
      }, 190);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setauthModalState(false));
      alert("Logged In");
    } catch (err: any) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        try {
          await handleLogin();
          dispatch(setauthModalState(false));
          alert("Logged In");
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, GoogleProvider);
      dispatch(setauthModalState(false));
      alert("Signed In");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="Modal-bg"
        onClick={(e) => handlemodal(e)}
        aria-modal={true}
        aria-labelledby="AuthModalHeading"
        role="dialog"
      >
        <section
          className="AuthModal-contentbox-main"
          ref={authContentBox}
          aria-label="Authentication Modal"
        >
          <h2 id="AuthModalHeading">Welcome !</h2>

          <form className="AuthForm" onSubmit={(e) => handleSubmit(e)}>

            <fieldset className="InputGroup">
              <legend className="sr-only">Sigin Details</legend>

              <div className="InputFields">
                <input
                  id="emailInput"
                  type="email"
                  placeholder=" "
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="emailInput">Email</label>
              </div>

              <div className="InputFields">
                <input
                  id="passwordInput"
                  type="password"
                  placeholder=" "
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="passwordInput">Password</label>
              </div>

              <button
                className="authBtn"
                type="submit"
                aria-label="SignIn with Email and Password"
              >
                Signin
              </button>
              
            </fieldset>
          </form>

          <footer>
            <button
              className="authBtn"
              onClick={signInWithGoogle}
              aria-label="SignIn With Google"
            >
              <i className="fa-brands fa-google" aria-hidden={true}></i> Sign In
              Google
            </button>
          </footer>

        </section>
      </div>
    </>
  );
}
