import "./login.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error, setError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false); // Track login success

  const { updateUser } = useContext(AuthContext);

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      if (response.status === 200) {
        setError(null); // Clear error state upon successful login
        setLoginSuccess(true); // Set login success state to true
        updateUser(response.data.user);

        nav("/");
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const notificationExample = ({ Message }) => {
    return (
      <>
        <figure className="notification">
          <div className="notification__body">
            {Message === "User does not exist" && (
              <>
                <img
                  className="notification__icon"
                  src="/error.svg"
                  alt="error"
                />
                <p>User does not exist</p>
              </>
            )}
            {Message === "Invalid credentials" && (
              <>
                <img
                  className="notification__icon"
                  src="/error.svg"
                  alt="error"
                />
                <p>Invalid credentials</p>
              </>
            )}
            {Message === "Server error" && (
              <>
                <img
                  className="notification__icon"
                  src="/error.svg"
                  alt="error"
                />
                <p>Server error</p>
              </>
            )}
            {Message === "User logged in" && (
              <>
                <img
                  className="notification__icon"
                  src="/check-circle.svg"
                  alt="success"
                />
                <p>User logged in</p>
              </>
            )}
          </div>
          <div className="notification__progress"></div>
        </figure>
        <style jsx="true">{`
          .notification {
            position: absolute;
            bottom: 4px;
            right: 4px;
            width: max-content;
            border-radius: 6px;
            background-color: #313e2c;
            color: #aaec8a;
            box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
            transform: translateY(30px);
            opacity: 0;
            visibility: hidden;
            animation: fade-in 3s linear;
          }

          .notification__icon {
            height: 26px;
            width: 26px;
            margin-right: 4px;
          }

          .notification__body {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 16px 8px;
          }

          .notification__progress {
            position: absolute;
            left: 4px;
            bottom: 4px;
            width: calc(100% - 8px);
            height: 3px;
            transform: scaleX(0);
            transform-origin: left;
            background: linear-gradient(to right, #313e2c, #aaec8a);
            border-radius: inherit;
            animation: progress 2.5s 0.3s linear;
          }

          @keyframes fade-in {
            5% {
              opacity: 1;
              visibility: visible;
              transform: translateY(0);
            }
            95% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes progress {
            to {
              transform: scaleX(1);
            }
          }
        `}</style>
      </>
    );
  };

  // Clear error state upon button click
  const handleClearError = () => {
    setError(null);
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            minLength={3}
            maxLength={20}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={4}
            maxLength={20}
          />
          <button type="submit" onClick={handleClearError}>
            Login
          </button>{" "}
          {/* Clear error state upon button click */}
          {error && notificationExample({ Message: error })}
          {loginSuccess && notificationExample({ Message: "User logged in" })}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
