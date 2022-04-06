import Navbar from "../../components/Navbar/Navbar";
import Products from "../../components/Products/Products";
import Footer from "../../components/Footer/Footer";


/**
 * Componnet for rendering the main page of all products
 * @params -
 * @returns main page
 */
const Main = () => {

  return (
    <div>
      <Navbar centerTitle={"Alle Produkte"}/>
      <Products favorites={false}/>
      <Footer />
    </div>
  );
};

export default Main;
