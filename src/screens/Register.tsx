import React, { useState } from "react";
import addImg from "../img/addImage.jpg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

type Props = {};

const Register = (props: Props) => {
  const navigate = useNavigate();
  const [err, setErr] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    /* @ts-expect-error auto-src: non-strict-conversion*/
    const displayName = event.target[0].value;
    /* @ts-expect-error auto-src: non-strict-conversion*/
    const email = event.target[1].value;
    /* @ts-expect-error auto-src: non-strict-conversion*/
    const password = event.target[2].value;
    /* @ts-expect-error auto-src: non-strict-conversion*/
    const photoFile = event.target[3].files[0];

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, photoFile);

      uploadTask.on(
        /* @ts-expect-error auto-src: non-strict-conversion*/
        (error: any) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", response.user.uid), {});

            navigate("/");
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="registerOverlay">
      <div className="registerWrapper">
        <form onSubmit={handleSubmit} className="registerForm">
          <p>Register</p>
          <input name="displayName" type="text" placeholder="Username" />
          <input name="email" type="email" placeholder="Register Mail" />
          <input
            name="password"
            type="password"
            placeholder="Enter a password"
          />
          <input
            type="file"
            className="avatar"
            name="photoFile"
            id="avatar"
            style={{ display: "none" }}
          />
          <label htmlFor="avatar" className="avatar-label">
            <img src={addImg} alt="" width={40} />
            Add an Avatar
          </label>
          <button>SignUp</button>
          {err && <span>Irresponsible server rendering...</span>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login.</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
