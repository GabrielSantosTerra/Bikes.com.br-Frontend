"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/services/api";
import styles from "./resetPassword.module.css";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Pega o token da URL

  useEffect(() => {
    if (!token) {
      setMessage("Token inválido ou expirado.");
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/reset-password", {
        token, // Enviar o token
        new_password: formData.newPassword,
      });

      if (response.status === 200) {
        setMessage("Senha alterada com sucesso!");
        router.push("/pages/login"); // Redireciona para o login
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Erro ao alterar a senha.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Redefinir Senha</h1>
      {message && <p className={styles.message}>{message}</p>}
      {!token ? (
        <p className={styles.error}>Token inválido. Solicite novamente.</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Nova senha</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <label className={styles.label}>Confirmar senha</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? "Alterando..." : "Redefinir Senha"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
