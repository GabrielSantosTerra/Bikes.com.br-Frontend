"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './login.module.css';
import { FaArrowRightToBracket } from "react-icons/fa6";
import api from "@/services/api";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "gabrielsantosterra@gmail.com",
    password: "123456789",
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
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await api.post("/auth/login", formData);

      if (response.status === 200) {
        const { access_token, user } = response.data;
        document.cookie = `authToken=${access_token}; path=/`;
        localStorage.setItem("authToken", access_token);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);

        router.push("/pages/home");
      }
    } catch (error: any) {
      console.error("Erro na requisição:", error);
      setMessage(error.response?.data?.message || "Erro ao realizar login.");
    } finally {
      setIsLoading(false);
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
