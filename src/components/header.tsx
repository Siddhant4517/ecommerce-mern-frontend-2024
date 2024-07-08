import { useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign out Failed");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => setIsOpen(false)}
          >
            UrbanCart
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item1">
                <Link
                  className="nav-link"
                  to="/search"
                  onClick={() => setIsOpen(false)}
                >
                  <FaSearch />
                </Link>
              </li>
              <li className="nav-item2">
                <Link
                  className="nav-link"
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                >
                  <FaShoppingBag />
                </Link>
              </li>
              <li className="nav-item3">
                {user?._id ? (
                  <>
                    <button
                      onClick={() => setIsOpen((prev) => !prev)}
                      className="user-icon-btn"
                      style={{ background: "none", border: "none" }}
                    >
                      <FaUser />
                    </button>
                    {isOpen && (
                      <div className="user-dialog">
                        {user.role === "admin" && (
                          <Link
                            to="/admin/dashboard"
                            onClick={() => setIsOpen(false)}
                          >
                            Admin
                          </Link>
                        )}
                        <Link to="/orders" onClick={() => setIsOpen(false)}>
                          Orders
                        </Link>
                        <button
                          style={{ background: "none", border: "none" }}
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={"/login"}>
                    <FaSignInAlt className="signin-btn" />
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
