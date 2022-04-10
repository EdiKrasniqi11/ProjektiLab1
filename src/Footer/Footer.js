import FooterCSS from "./Footer.module.css";

function Footer() {
  return (
    <div className={FooterCSS.footerDiv}>
      <div id={FooterCSS.footerList}>
        <ul>
          <li>CONTACT</li>
          <li>FACEBOOK</li>
          <li>TWITTER</li>
          <li>INSTAGRAM</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;