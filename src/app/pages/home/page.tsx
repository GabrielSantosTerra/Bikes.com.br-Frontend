'use client';

import { useState } from 'react';
import styles from './home.module.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Card } from 'flowbite-react';
import { FaMagnifyingGlass, FaArrowRightToBracket } from 'react-icons/fa6';

const Home = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const cardSection2Data = [
    { image: '/img/card1.png', link: '/page1' },
    { image: '/img/card2.png', link: '/page2' },
    { image: '/img/card3.png', link: '/page3' },
    { image: '/img/card4.png', link: '/page4' },
    { image: '/img/card5.png', link: '/page5' },
    { image: '/img/card6.png', link: '/page6' },
  ];

  const cardSection4Data = [
    { image: '/img/style.png', link: '/oferta1', title: 'MOUNTAIN BIKE' },
    { image: '/img/style.png', link: '/oferta3', title: 'TRIATHLON' },
    { image: '/img/style.png', link: '/oferta4', title: 'TRIAL' },
    { image: '/img/style.png', link: '/oferta2', title: 'BIKES ANTIGAS' },
    { image: '/img/style.png', link: '/oferta5', title: 'BIKE ELÉTRICA' },
    { image: '/img/style.png', link: '/oferta6', title: 'SPEED' },
  ];

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        {/* Section 1 */}
        <div id="home" className={styles.section1}>
          <div className={styles.imageContainer}>
            <img
              src="/img/fundo-home.png"
              alt="Fundo"
              className={styles.backgroundImage}
            />
            <div className={styles.overlayText}>
              <h1>Seu principal marketplace de bikes</h1>
            </div>
            <div className={styles.search}>
              <div className={styles.tabContainer}>
                <div
                  className={`${styles.tab1} ${activeTab === 'tab1' ? styles.active : ''}`}
                  onClick={() => setActiveTab('tab1')}
                >
                  Bikes
                </div>
                <div
                  className={`${styles.tab2} ${activeTab === 'tab2' ? styles.active : ''}`}
                  onClick={() => setActiveTab('tab2')}
                >
                  Peças e acessórios
                </div>
                <button className={styles.button}>
                  <FaMagnifyingGlass className="w-35 text-2xl" />
                  Pesquisar
                </button>
              </div>
              <input
                type="search"
                id="search"
                name="search"
                placeholder="Digite aqui o que você procura..."
                className={styles.input}
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className={styles.section2}>
          <h1 className={styles.title}>Escolha por marca</h1>
          <div className={styles.cardGridContainer}>
            <div className={styles.cardGrid}>
              {cardSection2Data.map((card, index) => (
                <a href={card.link} key={index} className={styles.cardLink}>
                  <Card className={styles.card}>
                    <img
                      src={card.image}
                      alt={`Imagem do Card ${index + 1}`}
                      className={styles.cardImage}
                    />
                  </Card>
                </a>
              ))}
              <Card className={styles.announcement1}>
                <h5 className="text-lg font-bold">Anúncio</h5>
              </Card>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className={styles.section3}>
          <h1 className={styles.title}>Destaque da semana</h1>
          <div className={styles.cardContainer}>
            <Card className={styles.highlightCard}>
              <img src="/img/highlight.png" className={styles.highlightImage} />
              <div className={styles.highlightInfo}>
                <h5 className={styles.highlightTitle}>Garmin Edge 530</h5>
                <span className={styles.highlightPrice}>R$ 1.299</span>
              </div>
              <a href="#" className={styles.highlightButton}>
                Adicionar ao carrinho
              </a>
            </Card>

            <Card className={styles.highlightCard}>
              <img src="/img/highlight.png" className={styles.highlightImage} />
              <div className={styles.highlightInfo}>
                <h5 className={styles.highlightTitle}>Garmin Edge 530</h5>
                <span className={styles.highlightPrice}>R$ 1.299</span>
              </div>
              <a href="#" className={styles.highlightButton}>
                Adicionar ao carrinho
              </a>
            </Card>
          </div>
          <Card className={styles.announcement2}>
            <h5 className="text-lg font-bold">Anúncio</h5>
          </Card>
        </div>

        {/* Section 4 */}
        <div className={styles.section4}>
          <div className={styles.section4Container}>
            <h1 className={styles.section4Title}>
              QUAL O SEU <span className={styles.boldText}>ESTILO?</span>
            </h1>
            <div className={styles.cardGridSection4}>
              {cardSection4Data.map((card, index) => (
                <a href={card.link} key={index} className={styles.cardLink}>
                  <Card className={styles.cardSection4}>
                    <img
                      src={card.image}
                      alt={card.title}
                      className={styles.cardImageSection4}
                    />
                    <h5 className={styles.cardTitle}>{card.title}</h5>
                    <button className={styles.cardButton}>
                      Confira{' '}
                      <FaArrowRightToBracket className={styles.arrowIcon} />
                    </button>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.section5}>
          <h1 className={styles.section5Title}>
            Olha o que selecionamos pra você
          </h1>
          <div className={styles.cardContainer5}>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className={styles.highlightCard5}>
                  <img
                    src={`/img/highlight.png`}
                    className={styles.highlightImage5}
                  />
                  <div className={styles.highlightInfo5}>
                    <h5 className={styles.highlightTitle5}>
                      Produto {index + 1}
                    </h5>
                    <span className={styles.highlightPrice5}>R$ 999</span>
                  </div>
                  <a href="#" className={styles.highlightButton5}>
                    Adicionar ao carrinho
                  </a>
                </Card>
              ))}
          </div>
          <Card className={styles.announcement2}>
            <h5 className="text-lg font-bold">Anúncio</h5>
          </Card>
        </div>
        <div className={styles.section6}>
          <h1 className={styles.section6Title}>Mais Procurados</h1>
          <div className={styles.cardContainer6}>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className={styles.highlightCard6}>
                  <img
                    src={`/img/highlight.png`}
                    className={styles.highlightImage6}
                  />
                  <div className={styles.highlightInfo6}>
                    <h5 className={styles.highlightTitle6}>
                      Produto {index + 1}
                    </h5>
                    <span className={styles.highlightPrice6}>R$ 999</span>
                  </div>
                  <a href="#" className={styles.highlightButton6}>
                    Adicionar ao carrinho
                  </a>
                </Card>
              ))}
          </div>
        </div>
        <div className={styles.section7}>
          <h2 className={styles.section7Title}>Confira nosso Instagram</h2>

          <div className={styles.section7Grid}>
            {[...Array(6)].map((_, index) => (
              <div key={index} className={styles.section7Card}></div>
            ))}
          </div>

          <button className={styles.instagramButton}>📷 Siga-nos agora</button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
