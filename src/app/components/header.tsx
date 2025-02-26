'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './header.module.css';
import { Dropdown, Drawer, Sidebar } from 'flowbite-react';
import { RxHamburgerMenu } from 'react-icons/rx';
import {
  HiChartPie,
  HiCollection,
  HiLogin,
  HiPencil,
  HiShoppingBag,
  HiUsers,
} from 'react-icons/hi';
import api from '@/services/api';

const Header = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    if (name && email) {
      setUser({ name, email });
    }
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 720);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const logout = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Pegando o token salvo
  
      if (!token) {
        console.error("Nenhum token encontrado.");
        router.push('/pages/login');
        return;
      }
  
      await api.post('/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}` // Enviando o token no cabeçalho
        },
        withCredentials: true // Permite o envio de cookies
      });
  
      // Remove os dados do usuário do localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
  
      // Redireciona para login
      router.push('/pages/login');
  
    } catch (error: any) {  // 🔹 Correção: Definir error como 'any'
      console.error('Erro ao deslogar:', error?.response?.data || error?.message || error);
    }
  };
  
  
  return (
    <header className={`${styles.header} ${isOpen ? styles.drawerOpen : ''}`}>
      <div className={styles.sectionA}>
        <a href="/pages/home">
          <img
            src="/img/logo.png"
            alt="Logo do Projeto"
            className={styles.logo}
          />
        </a>
      </div>

      {/* Seção de navegação (links) - visível apenas no desktop */}
      <nav className={styles.sectionB}>
        <div className={styles.navLinks}>
          <a href="/pages/about">Quem somos</a>
          <a href="#buy">Comprar</a>
          <a href="#sell">Vender</a>
          <a href="#contact">Contato</a>
        </div>
      </nav>

      {/* Ícones de acesso - visíveis apenas no desktop */}
      <div className={styles.sectionC}>
        <a href="/cart">
          <img src="/img/carrinho.png" alt="Carrinho" className={styles.icon} />
        </a>
        <a href="/favorites">
          <img
            src="/img/favoritos.png"
            alt="Favoritos"
            className={styles.icon}
          />
        </a>

        <Dropdown
          arrowIcon={false}
          inline
          label={
            <img
              src="/img/user.png"
              alt="Usuário"
              className={styles.avatarIcon}
            />
          }
        >
          <Dropdown.Header>
            <h1 className={styles.dropdownTitle}>{user?.name || 'Usuário'}</h1>
            <h1 className={styles.dropdownEmail}>
              {user?.email || 'Email não encontrado'}
            </h1>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Configurações</Dropdown.Item>
          <Dropdown.Item>Ganhos</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
        </Dropdown>

        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
          <img
            src="/img/whatsapp.png"
            alt="WhatsApp"
            className={styles.socialIcon}
          />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/img/instagram.png"
            alt="Instagram"
            className={styles.socialIcon}
          />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/img/facebook.png"
            alt="Facebook"
            className={styles.socialIcon}
          />
        </a>
      </div>

      {/* Ícone do Menu Mobile (só aparece em telas pequenas e some quando o Drawer abre) */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={styles.hamburgerButton}
        >
          <RxHamburgerMenu className={styles.hamburgerIcon} />
        </button>
      )}

      {/* Menu Lateral (Drawer) */}
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <h1 className={styles.dropdownTitle}>{user?.name || 'Usuário'}</h1>
        <h1 className={styles.dropdownEmail}>
          {user?.email || 'Email não encontrado'}
        </h1>
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item href="/" icon={HiChartPie}>
                      Quem somos
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/e-commerce/products"
                      icon={HiShoppingBag}
                    >
                      Comprar
                    </Sidebar.Item>
                    <Sidebar.Item href="/users/list" icon={HiUsers}>
                      Vender
                    </Sidebar.Item>
                    <Sidebar.Item href="/authentication/sign-in" icon={HiLogin}>
                      Contato
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item
                      href="/authentication/sign-up"
                      icon={HiPencil}
                    >
                      Configurações
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="https://flowbite-react.com/"
                      icon={HiCollection}
                      onClick={logout}
                    >
                      Sair
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </header>
  );
};

export default Header;
