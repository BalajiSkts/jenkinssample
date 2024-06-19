import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import userIcon from "./../../user-icon.jpg";
import { Modal } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [data, setData] = useState(
    localStorage.getItem("ecrf_details") || null
  );

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  const handleOpen = () => {
    setShowModal(true);
  };
  const handleConfirm = () => {
    Cookies.remove("tkn");
    Cookies.remove("role");
    localStorage.removeItem("ecrf_details");
    setData(null);
    setUsername(null);
    navigate("/login");
  };
  useEffect(() => {
    let userDetails = typeof data === "string" ? JSON.parse(data) : data;
    setUsername(userDetails?.username);
    let role = userDetails?.roles && userDetails?.roles[0];
    setRole(role && role.replace(/^ROLE_/i, ""));
  }, [data]);

  // const logout = () => {
  //   Cookies.remove("tkn");
  //   Cookies.remove("role");
  //   localStorage.removeItem("ecrf_details");
  //   setData(null);
  //   setUsername(null);
  //   navigate("/login");
  // };

  return (
    <>
      <div className="header-nav">
        <div className="row">
          <div className="col d-flex align-items-center header-wrapper"></div>
          <div
            className="col-auto"
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <div style={{ marginRight: 10 }}>
              <span style={{ fontWeight: 600 }}>Role: {role}</span>
            </div>
            <div className="verticalLine"></div>
            <div style={{ marginRight: 10 }}>
              <span style={{ fontWeight: 600 }}>User: {username}</span>
            </div>
            {/* <div className="btn-group">
              <a className="profile-pic-dropdown">
                <div className="profile_pic">
                  <img src={userIcon} alt="" />
                </div>
              </a>
            </div> */}
            <div>
              <span
                style={{ cursor: "pointer", marginLeft: 15 }}
                onClick={() => handleOpen()}
                title="Logout"
              >
                <LogoutIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        style={{ textAlign: "center" }}
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ display: "flex", flexDirection: "column" }}>
          Are you want to Logout ?
          <div style={{ marginTop: "20px" }}>
            <button
              style={{
                backgroundColor: "pink",
                color: "white",
                width: "90px",
                height: "35px",
                borderRadius: "8px",
                margin: "8px",
              }}
              onClick={handleConfirm}
            >
              Yes
            </button>
            <button
              style={{
                backgroundColor: "pink",
                color: "white",
                width: "90px",
                height: "35px",
                borderRadius: "8px",
                margin: "8px",
              }}
              onClick={handleClose}
            >
              No
            </button>
          </div>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light" style={header}>
        <div className='d-flex justify-content-between' style={{width: '100%'}}>
          <div>
          </div>
            <div className="d-flex justify-content-end">
              <span>{username}</span>
              <span style={{cursor: 'pointer', marginLeft: 15}} onClick={() => logout()} title='Logout'><LogoutIcon /></span>
            </div>
        </div>
      </nav> */}
    </>
  );
};

const header = {
  padding: 30,
  marginBottom: 0,
};

export default Header;
