import { useLocation } from 'react-router-dom'
import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./styles.module.css";


/**
 * Renders the product info page
 * @params - 
 * @returns - rendered product info page
 */
const Product = () => {

  /**
   * react hook state for favorite product
   */
  const [productIsFavorite, setProductIsFavorite] = useState([]);

  /**
   * localStorage containin the user token
   * @default false if no user
   */
  const user = localStorage.getItem("token");

  /**
   * Returns the current location object, which represents the current URL in web browsers.
   */
  const location = useLocation()

  /**
   * product params
   */
  const { id, article_number, name, description, price, img } = location.state;


  /**
   * adds a prouct to the favorites of user and saves to server database
   * @param -
   * @returns -
   */
   const addToFavorites = () => {

    // get favorites from local storage and parse it
    var favorites = JSON.parse(localStorage.favorites);

    // add the new product to the favorites
    favorites.articles.push(article_number);
    // set state hook
    setProductIsFavorite(true);

    // send new favorites to server to save
    localStorage.favorites = JSON.stringify(favorites);
    saveFavorites(favorites);
  }


  /**
   * removes a prouct from the favorites of user and saves to server database
   * @param -
   * @returns -
   */
   const removeFromFavorites  = () => {
    
    // get favorites from local storage and parse it
    var favorites = JSON.parse(localStorage.favorites);

    // remove all products with given article number form favorites array
    for (var i = favorites.articles.length; i--; )
    {
      if (favorites.articles[i] === ("" + article_number)) {
        favorites.articles.splice(i, 1);
      }
    }

    // set the state hook
    setProductIsFavorite(false);

    // send new favorites to server to save
    localStorage.favorites = JSON.stringify(favorites);
    saveFavorites(favorites);
  };


  /**
   * Send changed favorites to server to save
   * @param favorites - the favorites array
   */
   const saveFavorites = async (favorites) => {

    // send with axios
    try {
      const url = "http://localhost:8080/api/favorites";
      await axios.post(url, { params: { favorites: JSON.stringify(favorites), id: localStorage.id }});
    }
    catch (error) {
      console.error("Error sending favorites")
    }
  }

  // if user is logged
  if(user)
  {
    // check if product is in the favorites and set state hook
    const favorites = JSON.parse(localStorage.favorites);
    if(favorites.articles.indexOf("" + article_number) > -1)
    {
      if(!productIsFavorite)
        setProductIsFavorite(true);
    }
    else
    {
      if(productIsFavorite)
        setProductIsFavorite(false);
    }
  }


  return (

    <div>
      <Navbar />

      <div className={styles.prod_container}>
        <div className={styles.prod_wrapper}>
          <div className={styles.prod_imgContainer}>
             <img className={styles.prod_image} src={ img } />
          </div>

          <div className={styles.prod_infoContainer}>
            <h1 className={styles.prod_title}>Artikelnummer: { article_number }</h1>
            <h1 className={styles.prod_title}>Name: { name }</h1>
            <p className={styles.prod_desc}>Beschreibung: { description } </p>
            <span className={styles.prod_span}>Preis: ${ price }</span>

            {/* if user logged in */}
            { user && 
              <div>
              {
                // add to favorites button
                !productIsFavorite && 
                <div className={styles.prod_addContainer}>
                  <button className={styles.prod_button} onClick={addToFavorites}>Zu Favoriten hinzufügen</button>
                </div>
              }

              { 
                // remove from favorites button
                productIsFavorite && 
                <div className={styles.prod_addContainer}>
                  <button className={styles.prod_button} onClick={removeFromFavorites}>Aus den Favoriten entfernen</button>
                </div>
              }

              </div>
            }

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Product;