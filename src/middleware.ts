import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken'); // Verifica se há um token no cookie

  // Se o token não existir, redireciona para a página de login
  if (!token) {
    return NextResponse.redirect(new URL('/pages/login', request.url));
  }

  // Se o token existir, permite o acesso à página
  return NextResponse.next();
}

// Define as rotas protegidas
export const config = {
  matcher: ['/pages/home'], // Protege apenas a rota `/pages/home`
};
