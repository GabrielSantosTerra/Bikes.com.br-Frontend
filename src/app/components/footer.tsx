import styles from "./footer.module.css";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useState } from "react";

const Footer = () => {

 const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.section}>
          <ul className={styles.links}>
            <div className={styles.group1}>
            <li>
              <a href="#about">Política de troca</a>
            </li>
            <li>
              <a href="#services">Perguntas frequentes</a>
            </li>
            <li>
              <a href="#contact">Política de privacidade</a>
            </li>
            </div>

            <div className={styles.group2}>
            <li>
              <a href="#faq">Crie sua conta</a>
            </li>
            <li>
              <a href="#faq">Trabalhe conosco</a>
            </li>
            <li>
              <a href="#faq">Anuncie na Bikes.com.br</a>
            </li>
            </div>
          </ul>
        </div>

        <div className={styles.section}>
          <img className={styles.Logo} src="/img/logo.png"/>
          <div className={styles.socialIcons}>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              <img src="/img/whatsapp-footer.png" alt="WhatsApp" className={styles.icon} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src="/img/instagram-footer.png" alt="Instagram" className={styles.icon} />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src="/img/facebook-footer.png" alt="Facebook" className={styles.icon} />
            </a>
          </div>
        </div>

        <div className={styles.sectionImput}>
          <div className={styles["form-group"]}>
          <label htmlFor="email" className={styles.tittle}>
          Assine nossa Newsletter 
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.ButtonSubmit}>
            <button type="submit" className={styles.button} disabled={isLoading}>
              {isLoading ? (
                <span className={styles.spinner}></span>
              ) : (
                <>
                  Enviar <FaArrowRightToBracket />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} Bikes.com.br Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;