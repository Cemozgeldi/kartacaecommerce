import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../contexts/Auth.Context";
import { useBasket } from "../../contexts/BasketContext";
const Navbar = () => {
  const { loggedIn } = useAuth();
  const { items } = useBasket();
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className="logo">
          <Link to="/">Logo</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="blue">Login</Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="blue">Register</Button>
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="pink" variant="outline">
                  Basket ({items.length})
                </Button>
              </Link>
            )}
            <Link to="/profile">
              <Button colorScheme="pink">Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
