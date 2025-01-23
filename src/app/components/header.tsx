"use client";

import { useEffect, useState } from "react";
import styles from "./header.module.css";
import { Dropdown } from "flowbite-react";

const Header = () => {

const [user, setUser] = useState<{ name: string; email: string } | null>(null);

useEffect(() => {
  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");

  if (name && email) {
    setUser({ name, email });
  }
}, []);

  return (
    <header className={styles.header}>
      <div className={styles.sectionA}>
        <a href="/pages/home"><img src="/img/logo.png" alt="Logo do Projeto" className={styles.logo} /></a>
      </div>

      <nav className={styles.sectionB}>
        <a href="#about">Quem somos</a>
        <a href="#buy">Comprar</a>
        <a href="#sell">Vender</a>
        <a href="#contact">Contato</a>
      </nav>

      <div className={styles.sectionC}>
        <a href="/cart">
          <img src="/img/carrinho.png" alt="Carrinho" className={styles.icon} />
        </a>
        <a href="/favorites">
          <img src="/img/favoritos.png" alt="Favoritos" className={styles.icon} />
        </a>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <img src="/img/user.png" alt="Usuário" className={styles.avatarIcon}/>
          }
        >
          <Dropdown.Header>
            <h1 className={styles.dropdownTitle}>{user?.name || "Usuário"}</h1>
            <h1 className={styles.dropdownEmail}>{user?.email || "Email não encontrado"}</h1>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Configurações</Dropdown.Item>
          <Dropdown.Item>Ganhos</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sair</Dropdown.Item>
        </Dropdown>

        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
          <img src="/img/whatsapp.png" alt="WhatsApp" className={styles.socialIcon} />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img src="/img/instagram.png" alt="Instagram" className={styles.socialIcon} />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <img src="/img/facebook.png" alt="Facebook" className={styles.socialIcon} />
        </a>
      </div>
    </header>
  );
};

export default Header;
