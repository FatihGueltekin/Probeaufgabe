import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
  

/**
 * Product Component - shows a product on main page
 * @param item - displayed product
 * @param favorites - true if user favorites page is rendered
 * @returns - rendered product
 */
const Product = (props) => {

  /**
   * actual product
   */
  const item = props.item;

  /**
   * is favorite page rendered
   */
  const favorite = props.favorites;

  /**
   * react hook state for favorite product
   */
  const [productIsFavorite, setProductIsFavorite] = useState([]);

  /**
   * localStorage containin the user token
   * @default false if no user
   */
  const user = localStorage.token;


  /**
   * adds a prouct to the favorites of user and saves to server database
   * @param -
   * @returns -
   */
  const addToFavorites = () => {

    // get favorites from local storage and parse it
    var favorites = JSON.parse(localStorage.favorites);

    // add the new product to the favorites
    favorites.articles.push(item.article_number);
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
      if (favorites.articles[i] === ("" + item.article_number)) {
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
    if(favorites.articles.indexOf("" + item.article_number) > -1)
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

  // if favorites page is active and product is not in favorites return empty
  if(user && favorite && !productIsFavorite)
    return;

  return (

    <div className={styles.product}>
    
      {/* Go to product page for details */}
      <Link title="Zur Produktseite gehen..." className={styles.product_link} to={"/product"} state={{ id: item.id, 
                                                                     article_number: item.article_number, 
                                                                     name: item.name, 
                                                                     description: item.description,
                                                                     price: item.price,
                                                                     img: item.img}}>
        <div className={styles.product_container}>
          <div className={styles.product_circle} />
          <img className={styles.product_image} src={item.img} />
        </div>
      </Link>

      {/* if user logged in */}
      { user && <div>
        { 
          // if product is favorite show a filled heart
          productIsFavorite && 
          <button title="Aus den favoriten entfernen" onClick={removeFromFavorites} className={styles.product_button}>
            <AiFillHeart className={styles.product_icon}/>
          </button>
        }

        {
          // if product is not favorite show a empty heart
          !productIsFavorite && 
          <button title="Zu favoriten hizufügen" onClick={addToFavorites} className={styles.product_button}>
            <AiOutlineHeart className={styles.product_icon}/>
          </button>
        }
        </div>
      }

      {/* render name and price of the product */}
      <h1 className={styles.product_name}>{item.name}</h1>
      <h1 className={styles.product_price}>Preis: ${item.price}</h1>
    </div>
  );
};

export default Product;