"use client";

import styles from './home.module.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { FaMagnifyingGlass } from "react-icons/fa6";

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
                <div className={styles.tab1}>Bikes</div>
                <div className={styles.tab2}>Peças e acessórios</div>
                <button className={styles.button}><FaMagnifyingGlass className='w-40 text-6xl'/>Pesquisar</button>
              </div>
              <input
                type="search"
                id="search"
                name="search"
                placeholder="Digite aqui o que você procura..."
                className={styles.input}
                required
                
              />
              <div className="absolute left-10 right-60 h-[1px] bg-gray-200 mt-36" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
