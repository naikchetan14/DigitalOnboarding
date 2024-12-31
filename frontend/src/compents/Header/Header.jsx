import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Actions/authAction/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearError,
  clearMessage,
} from "../../Reducers/authReducers/userReducers";

const Header = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated, message, error } = useSelector(
    (store) => store.user
  );
  const logoutHandler = async () => {
    try {
      console.log("running");
      await dispatch(logoutUser());
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (message && (!user || !isAuthenticated)) {
      alert.success(message);
      navigate("/login");
      dispatch(clearMessage());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [message, error]);

  return (
    <>
      <div className="flex flex-row justify-between gap-4 items-center align-items-center bg-violet-950 p-4  shadow-lg">
        <div>
          <Link to="/" className="flex items-center space-x-2">
            <i className="fa-sharp fa-solid fa-hotel text-white text-2xl"></i>
            <h3 className="text-red-400 text-xl lg:text-2xl font-bold">
              DigitalOnboarding
            </h3>
          </Link>
        </div>

        <div className="flex flex-row gap-2 items-center">
          {user?.role === "mainAdmin" && (
            <Link to="/mainadmin/add/newhotel">
              <button
                type="button"
                className="p-2 bg-green-700 text-white rounded"
              >
                Add New Hotel
              </button>
            </Link>
          )}

          {(user?.role === "mainAdmin" || user?.role === "guestAdmin") && (
            <Link to="/guest/allguestlist">
              <button
                type="button"
                className="p-2 bg-violet-700 text-white rounded"
              >
                See All Guest List
              </button>
            </Link>
          )}

          {user?.role && (
            <button
              type="button"
              className="p-2 bg-red-700 text-white rounded"
              onClick={logoutHandler}
            >
              Log Out
            </button>
          )}

          {user?.role ? (
            <div className="flex flex-row gap-1">
              <p className="text-white font-bold">{user?.username}</p>

              <span className="text-white font-bold">
                Role: {user?.role || "Guest"}
              </span>
            </div>
          ) : (
            <div className="flex flex-row gap-1">
              <span className="text-white font-bold">Role: Guest</span>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
