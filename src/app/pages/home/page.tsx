"use client";

import styles from './home.module.css';
import Header from '../../components/header';
import Footer from '../../components/footer';

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div id="home" className={styles.section}>
          <div className={styles.imageContainer}>
            <img src="/img/fundo-home.png" alt="Fundo" className={styles.backgroundImage} />
            <div className={styles.overlayText}>
              <h1>Seu principal marketplace de bikes</h1>
            </div>
            <div className={styles.search}>
              <div className={styles.tabContainer}>
                <div className={styles.tab}>Aba 1</div>
                <div className={styles.tab}>Aba 2</div>
              </div>
              <input
              type="search"
              id="search"
              name="search"
              placeholder="Digite aqui o que você procura..."
              className={styles.input}
              required
              />
              <button className={styles.button}>Buscar</button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
