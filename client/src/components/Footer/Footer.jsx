import styles from "./styles.module.css";


/**
 * Sample footer component
 * @params -
 * @returns rendered footer 
 */
const Footer = () => {
  return (
    <div className={styles.footer_container}>

      {/* Left */}
      <div className={styles.footer_left}>
        <h1>Digital Store</h1>
        <p className={styles.footer_desc}>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </p>
        <div className={styles.footer_socialContainer}>
          <div className={styles.footer_socialIcon} color="3B5999">
            F
          </div>
          <div className={styles.footer_socialIcon} color="E4405F">
            I
          </div>
          <div className={styles.footer_socialIcon} color="55ACEE">
            T
          </div>
          <div className={styles.footer_socialIcon} color="E60023">
            P
          </div>
        </div>
      </div>

      {/* Center */}
      <div className={styles.footer_center}>
        <h3 className={styles.footer_title}>Useful Links</h3>
        <ul className={styles.footer_list}>
          <li className={styles.footer_listItem}>Home</li>
          <li className={styles.footer_listItem}>Cart</li>
          <li className={styles.footer_listItem}>Man Fashion</li>
          <li className={styles.footer_listItem}>Woman Fashion</li>
          <li className={styles.footer_listItem}>Accessories</li>
          <li className={styles.footer_listItem}>My Account</li>
          <li className={styles.footer_listItem}>Order Tracking</li>
          <li className={styles.footer_listItem}>Wishlist</li>
          <li className={styles.footer_listItem}>Wishlist</li>
          <li className={styles.footer_listItem}>Terms</li>
        </ul>
      </div>

      {/* Right */}
      <div className={styles.footer_right}>
        <h3 className={styles.footer_title}>Contact</h3>
        <div className={styles.footer_contactItem}>
          R - 8887 Dixie
        </div>
        <div className={styles.footer_contactItem}>
          P - +43 234 56 78
        </div>
        <div className={styles.footer_contactItem}>
          M - contact@contact.dev
        </div>
        <img div className={styles.footer_img} src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </div>
    </div>
  );
};
  
export default Footer;