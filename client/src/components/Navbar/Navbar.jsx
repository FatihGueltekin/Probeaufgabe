import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";


/**
 * Logs the user out and reloads the page
 * @params -
 * @returns - 
 */
const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};


/**
 * Navbar component
 * @params title - string
 * @returns rendered footer 
 */
const Navbar = (props) => {

  /**
   * Title displayed at the center of the navbar
   */
  const centerTitle = props.centerTitle;
  
  /**
   * localStorage containin the user token
   * @default false if no user
   */
  const user = localStorage.getItem("token");


  return (
    <div className={styles.nav_container}>
      <div className={styles.nav_wrapper}>

        {/* Link to home*/}
        <div className={styles.nav_left}>
          <Link to="/" className={styles.nav_logo}>Digital Store</Link>
        </div>

        {/* Center title */}
        <div className={styles.nav_center}>
          <h1 className={styles.nav_title}>{centerTitle}</h1>
        </div>

        {/* Right - changes wiht user stage*/}
        <div className={styles.nav_right}>
          { !user && <Link to="/login" className={styles.nav_button}>Anmelden</Link> }
          { !user && <Link to="/register" className={styles.nav_button}>Registrieren</Link> }
          { user && <Link to="/favorites" className={styles.nav_button}>Meine Favoriten</Link> }
          { user && <Link to="/" className={styles.nav_button}>Alle Produkte</Link> }
          { user && <button className={styles.nav_button_logout} onClick={handleLogout}>Ausloggen</button> }
        </div>
      </div>
    </div>
  );
};

export default Navbar;