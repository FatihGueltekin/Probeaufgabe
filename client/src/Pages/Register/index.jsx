import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


/**
 * Component for displaying the Register page
 * @params -
 * @returns register page
 */
const Register = () => {

  /**
   * state hook for input data
   */
  const [data, setData] = useState({ firstName: "", lastName: "", email: "", password: "", });

  /**
   * state hook for errors
   */
  const [error, setError] = useState("");

  /**
   * 
   */
  const navigate = useNavigate();

  /**
   * handling input changes
   * @param currentTarget - target input 
   */
  const handleChange = ({ currentTarget: input }) => {
    // set data state hook
    setData({ ...data, [input.name]: input.value });
  };


  /**
   * Submit form data
   * @param {*} e 
   */
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
	  // send data to server
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } 
	catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (

    <div>
      <Navbar />

      <div className={styles.register_container}>
        <div className={styles.register_wrapper}>
          <h1 className={styles.register_title}>Neues Konto erstellen</h1>

          {/* render register form */}
          <form className={styles.register_form} onSubmit={handleSubmit}>
            <input className={styles.register_input} type="text" placeholder="Vorname" name="firstName" onChange={handleChange} value={data.firstName} required />
            <input className={styles.register_input} type="text" placeholder="Nachname" name="lastName" onChange={handleChange} value={data.lastName} required />
            <input className={styles.register_input} type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} required />
            <input className={styles.register_input} type="password" placeholder="Passwort" name="password" onChange={handleChange} value={data.password} required />

            <span className={styles.register_agreement}>
              Durch die Erstellung eines Kontos stimme ich der Verarbeitung meiner personenbezogenen Daten zu
              Daten gemäß der <b>DATENSCHUTZERKLÄRUNG</b>
            </span>

            {error && <div className={styles.register_error_msg}>{error}</div>}
            <button className={styles.register_button}>Erstellen</button>
          </form>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;