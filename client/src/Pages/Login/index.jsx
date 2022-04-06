import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


/**
 * Component for displaying the Login page
 * @params -
 * @returns login page
 */
const Login = () => {

  /**
   * state hook for input data
   */
  const [data, setData] = useState({ email: "", password: "" });

  /**
   * state hook for errors
   */
  const [error, setError] = useState("");


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
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);

	  // handle local storage
      localStorage.setItem("token", res.data);
      localStorage.setItem("id", res.id);

	  // load favorites page
      window.location = "/favorites";
    }
    catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (

    // return rendered page
    <div>
      <Navbar  centerTitle={""}/>

        <div className={styles.login_container}>

          <div className={styles.login_wrapper}>
            <h1 className={styles.login_title}>Anmeldung</h1>

            {/* render login form */}
            <form className={styles.login_form} onSubmit={handleSubmit}>
              <input className={styles.login_input} type="email" name="email" onChange={handleChange} value={data.email} required placeholder="Email" />
              <input className={styles.login_input} type="password" name="password" onChange={handleChange}	value={data.password} required placeholder="Password" />

              {error && <div className={styles.login_error_msg}>{error}</div>}
              <div className={styles.login_button_wrapper}>
                <button type="submit" className={styles.login_button}>Anmelden</button>
              </div>
            </form>
          </div>
        </div>

      <Footer />
    </div>
  );
};

export default Login;