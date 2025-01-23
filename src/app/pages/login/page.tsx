"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './login.module.css';
import { FaArrowRightToBracket } from "react-icons/fa6";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para controlar o carregamento

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsSuccess(null);
    setIsLoading(true); // Ativa o estado de carregamento

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        document.cookie = `authToken=${data.token}; path=/`;
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);

        setIsSuccess(true);
        router.push("/pages/home");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Erro ao realizar login.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setMessage("Erro ao conectar-se ao servidor. Tente novamente.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Faça seu login!</h1>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="email" className={styles.label}>
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              className={styles.input}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="password" className={styles.label}>
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              <>
                Enviar <FaArrowRightToBracket />
              </>
            )}
          </button>
        </form>
        {message && (
          <p
            className={`${styles.message} ${
              isSuccess ? styles["message-success"] : styles["message-error"]
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
