import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();
  const [err, setErr] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    /* @ts-expect-error auto-src: non-strict-conversion*/
    const email = event.target[0].value;
    /* @ts-expect-error auto-src: non-strict-conversion*/
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="registerOverlay">
      <div className="registerWrapper">
        <form onSubmit={handleSubmit} className="registerForm">
          <p>Login</p>
          <input type="email" placeholder="Enter login mail" />
          <input type="password" placeholder="Enter password" />
          <button>Login</button>
          {err && <span>Irresponsible server rander...</span>}
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
