'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './password.module.css';
import api from '@/services/api';

const PasswordChange = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
    verificationCode: '',
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState(1); // Etapa 1 = solicitar código, Etapa 2 = redefinir senha
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Enviar e-mail para solicitar reset de senha
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (!formData.email) {
      setMessage('O e-mail é obrigatório.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/request-password-reset', {
        email: formData.email,
      });

      if (response.status === 200) {
        setMessage('Código de verificação enviado para o e-mail.');
        setStep(2); // Avança para o próximo passo
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Erro ao enviar o e-mail.');
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Enviar código e senha para redefinir a senha
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('As senhas não coincidem.');
      setIsLoading(false);
      return;
    }

    if (!formData.verificationCode) {
      setMessage('O código de verificação é obrigatório.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/reset-password', {
        email: formData.email,
        new_password: formData.newPassword,
        verification_code: formData.verificationCode,
      });

      if (response.status === 200) {
        setMessage('Senha alterada com sucesso!');
        setTimeout(() => router.push('/login'), 2000); // Redireciona para login
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Erro ao alterar a senha.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Alteração de senha</h1>

        <p className={styles.description}>
          Informe seu e-mail e receba um código de verificação.
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
            {isLoading ? 'Enviando...' : 'Enviar código'}
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default PasswordChange;
