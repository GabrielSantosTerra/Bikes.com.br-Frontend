import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken'); // Obtém o token dos cookies

  const loginPath = '/pages/login';
  const homePath = '/pages/home';

  // Se o usuário estiver autenticado, redireciona para a página inicial ao tentar acessar login ou registro
  if (token && (request.nextUrl.pathname === loginPath)) {
    return NextResponse.redirect(new URL(homePath, request.url));
  }

  // Se o usuário NÃO estiver autenticado e tentar acessar uma página protegida, redireciona para login
  if (!token && request.nextUrl.pathname.startsWith(homePath)) {
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  return NextResponse.next(); // Permite o acesso normalmente
}

// Define as rotas protegidas e as páginas que precisam de validação
export const config = {
  matcher: ['/pages/login', '/pages/home'], // Aplica o middleware nessas rotas
};
