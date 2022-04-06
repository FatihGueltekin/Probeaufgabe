import Navbar from "../../components/Navbar/Navbar";
import Products from "../../components/Products/Products";
import Footer from "../../components/Footer/Footer";


/**
 * Componnet for rendering the user favorites page
 * @params -
 * @returns favorite page
 */
const Favorites = () => {

  return (
    <div>
      <Navbar centerTitle={"Favorisierte Produkte"}/>
      <Products favorites={true} />
      <Footer />
    </div>
  );
};

export default Favorites;