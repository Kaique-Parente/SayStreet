import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:8080/cliente/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            senha: credentials.password,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          const { senha, ...userSafe } = user;
          return userSafe;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
    updateAge: 15 * 60,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
  
      if (trigger === "update" && session) {
        token.user = {     
          id: session.id,
          nome: session.nome, 
          email: session.email,
          cpf: session.cpf,
          dataNascimento: session.dataNascimento,
          genero: session.genero,
          enderecos: session.enderecos,
          enderecoFatura: session.enderecoFatura,
          status: session.status,
        };
        console.log(token);
      }
  
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
