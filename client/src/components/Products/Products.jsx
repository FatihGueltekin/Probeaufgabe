import Product from "../Product/Product";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import axios from "axios";


/**
 * Gets all products and renders them
 * @param favorites - true if favorites page is rendered
 * @returns rendered products page
 */
const Products = (props) => {

  /**
   * is favorite page rendered
   */
  const favorites = props.favorites;

  /**
   * react hook state for products
   */
  const [ListOfProducts, setListOfProducts] = useState([]);

  /**
   * gets products list from server
   */
  useEffect(() => {
    // axios server call to get products list
    axios.get("http://localhost:8080/api/products").then((response) => {
      // save the list to the state hook
      setListOfProducts(response.data);
    })
  }, [])

  /**
   * localStorage containin the user token
   * @default false if no user
   */
  const user = localStorage.token;

  /**
   * localStorage containin the user id
   * @defaul -
   */
  const id = localStorage.id;


  /**
   * get products list from server and save them to local storage
   */
  const getFavoriteProducts = async () => {

    const url = "http://localhost:8080/api/favorites";
    
    // server call
    await axios.get(url, { params: { id: id }}).then((res) => {
      var temp = res.data.params.favorites;
      if(typeof(temp) == "undefined")
      {
        localStorage.favorites = JSON.stringify({articles: []});
      }
      else
      {
        localStorage.favorites = temp;
      }
    })
    .catch((err) => {  console.log("Prod Error: ", err) });
  }

  // if user is logged get user favorites
  if(user)
  {
    getFavoriteProducts();
  }

  // go trough all the products and display them with Product component
  return (

    <div className={styles.products_container}>
      {ListOfProducts.map((item) => (
        <Product item={item} key={item.id} favorites={ favorites }/>
      ))}
    </div>
    
  );
};

export default Products;