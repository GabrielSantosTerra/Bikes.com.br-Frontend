"use client";
import Header from '../../components/header';
import Footer from '../../components/footer';
import styles from './about.module.css';

const About = () => {
    return(
      <>
  <div className={styles.conteiner}>
    <Header />
    <main className={styles.main}>
      {/* Conteúdo principal */}
      <div className={styles.imageContainer}>
        <img
          src="/img/fundo-about.png"
          alt="Fundo"
          className={styles.backgroundImage}
        />
        <h1 className={styles.fraseImagem}>Quem somos</h1>
      </div>
      <div className={styles.descricao}>
        <h1 className={styles.Titulo}>Quem somos?</h1>
        <p>
          A Bikes.com.br está sendo pensada para se tornar a referência
          nacional quando se tratar das atividades relacionadas ao ciclismo.
          Sejam elas, atividades de lazer, competições, organização de eventos,
          compra e venda de Bikes novas e usadas, acessórios, peças, nutrição e
          muito mais...
        </p>
        <p>
          Nos posicionamos como uma Startup ligada ao ecossistema tecnológico
          fomentado no Sudoeste do Paraná, a empresa nasce com o objetivo de
          entregar valor para todos os envolvidos no mundo das Bikes. Nasce do
          sonho de seus Cofundadores, Gustavo Eduardo Terra e Eduardo Gaspareto,
          com o objetivo de criar um negócio sustentável, promissor,
          socialmente correto, mas principalmente fomentar a prática de um
          esporte fantástico que traz muita possibilidade. Vem com a gente!!!
          Clique aqui para ser avisado do lançamento. Deus abençoe!!!
        </p>
        <div className={styles.Imagens}>
          <img src="/img/Group 35.jpg" alt="Fundo" />
          <img src="/img/Group 34.jpg" alt="Fundo" />
          <img src="/img/Group 36.jpg" alt="Fundo" />
        </div>
      </div>
    </main>
  </div>
  <Footer />
</>

       
    )
}

export default About;