"use client";

import { useState } from "react";
import styles from "./sell.module.css";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const SellPage = () => {
  // ✅ Define um array vazio com tipagem segura
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Meus Anúncios</h1>

      <button className={styles.addButton}>Criar Novo Anúncio</button>

      {products.length === 0 ? (
        <p className={styles.noAdsMessage}>Você ainda não criou nenhum anúncio.</p>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <img src={product.image} alt={product.name} className={styles.image} />
              <h2 className={styles.name}>{product.name}</h2>
              <p className={styles.price}>R$ {product.price.toFixed(2)}</p>
              <button className={styles.sellButton}>Editar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellPage;
