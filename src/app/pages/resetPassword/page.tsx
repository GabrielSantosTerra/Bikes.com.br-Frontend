"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/services/api";
import styles from "./resetPassword.module.css";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

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
          <div className={styles.inputGroup}>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={styles.input}
              placeholder="Digite sua nova senha"
              required
            />
            <span
              className={`${styles.eyeIcon} ${showNewPassword ? styles.rotateIcon : ""}`}
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <IoEyeSharp />}
            </span>

          </div>

          <div className={styles.inputGroup}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
              placeholder="Confirme sua nova senha"
              required
            />
            <span
                className={`${styles.eyeIcon} ${showConfirmPassword ? styles.rotateIcon : ""}`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <IoEyeSharp />}
              </span>

          </div>

          <div className={styles.buttonDiv}>
            <button type="submit" className={styles.button} disabled={isLoading}>
              {isLoading ? "Alterando..." : "Redefinir Senha"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
