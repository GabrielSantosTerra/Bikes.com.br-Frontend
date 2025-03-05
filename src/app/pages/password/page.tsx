"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./password.module.css";
import api from "@/services/api"; // Ajuste conforme sua API

const PasswordChange = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    verificationCode: "", // Adicionando o código de verificação
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (!formData.email) {
      setMessage("O e-mail é obrigatório.");
      setIsLoading(false);
      return;
    }

    try {
      // Enviar apenas o e-mail para solicitar a recuperação de senha
      const response = await api.post("/auth/recover-password", {
        email: formData.email, // Enviar o e-mail no formato correto
      });

      if (response.status === 200) {
        setMessage("Código de verificação enviado para o e-mail.");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Erro ao enviar o e-mail.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    if (!formData.verificationCode) {
      setMessage("O código de verificação é obrigatório.");
      setIsLoading(false);
      return;
    }

    try {
      // Enviar o código e a nova senha para alterar
      const response = await api.post("/auth/change-password", {
        email: formData.email,
        new_password: formData.newPassword,
        verification_code: formData.verificationCode,
      });

      if (response.status === 200) {
        setMessage("Senha alterada com sucesso!");
        router.push("/login");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Erro ao alterar a senha.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Alteração de senha</h1>
        <p className={styles.description}>
          Para alterar sua senha, informe seu e-mail e receba um código de verificação.
        </p>

        <form onSubmit={handleEmailSubmit} className={styles.formGroup}>
            <div className={styles.inputEmail}>
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
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar código"}
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}

        {message === "Código de verificação enviado para o e-mail." && (
          <form onSubmit={handlePasswordSubmit} className={styles.formGroup}>
            <label htmlFor="verificationCode" className={styles.label}>Código de verificação</label>
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleChange}
              placeholder="Digite o código recebido"
              className={styles.input}
              required
            />

            <label htmlFor="newPassword" className={styles.label}>Nova senha</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Digite a nova senha"
              className={styles.input}
              required
            />

            <label htmlFor="confirmPassword" className={styles.label}>Confirmar nova senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirme a nova senha"
              className={styles.input}
              required
            />

            <button type="submit" className={styles.button} disabled={isLoading}>
              {isLoading ? "Alterando..." : "Alterar senha"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordChange;
