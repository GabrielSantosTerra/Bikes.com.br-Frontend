"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './register.module.css';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import api from "@/services/api";


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "Gabriel Santos Terra",
    email: "gabrielsantosterra@gmail.com",
    password: "123456789",
    cpf: "118.767.159-28",
    phone: "46999076301",
    birth_date: "2008-01-23",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleGoogleSignup = () => {
    console.log("Cadastro com Google iniciado");
    // Aqui você integraria o SDK do Google para autenticação
  };

  const handleFacebookSignup = () => {
    console.log("Cadastro com Facebook iniciado");
    // Aqui você integraria o SDK do Facebook para autenticação
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (Object.values(formData).some((value) => value.trim() === "")) {
      setMessage("Todos os campos são obrigatórios!");
      setIsLoading(false);
      return;
    }

    try {

      console.log(formData)

      const response = await api.post("/users/", formData); // Usando Axios

      if (response.status === 201 || response.status === 200) {
        router.push("/pages/home");
        setFormData({
          name: "",
          email: "",
          password: "",
          cpf: "",
          phone: "",
          birth_date: "",
        });
      }
    } catch (error: any) {
      console.error("Erro na requisição:", error);
      setMessage(error.response?.data?.message || "Erro ao conectar-se ao servidor.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro</h1>
      <div className={styles.form}>
        {/* Botões de cadastro com Gmail e Facebook */}
        <button onClick={handleGoogleSignup} className={styles.googleButton}>
          <FcGoogle size={20} /> Criar conta com Google
        </button>
        <button onClick={handleFacebookSignup} className={styles.facebookButton}>
          <FaFacebook size={20} /> Criar conta com Facebook
        </button>

        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="name" className={styles.label}>
              Nome:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles["form-group"]}>
              <label htmlFor="cpf" className={styles.label}>
                CPF:
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="Digite seu CPF"
                className={styles.input}
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="birth_date" className={styles.label}>
                Data de Nascimento:
              </label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles["form-group"]}>
              <label htmlFor="phone" className={styles.label}>
                Telefone:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Digite seu telefone"
                className={styles.input}
                required
              />
            </div>

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
            ):(
            <>
              Cadastrar <FaArrowRightToBracket />
            </>
            )}
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default RegisterForm;
