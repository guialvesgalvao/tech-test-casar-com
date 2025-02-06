# 🚀 Casar.com - Teste Técnico Frontend

Este é um projeto desenvolvido como parte do teste técnico para a vaga de **Desenvolvedor Frontend Pleno** na empresa **Casar.com**. O projeto permite buscar usuários no GitHub, visualizar seus perfis e repositórios, favoritar/desfavoritar repositórios e acessá-los na aba de favoritos, com persistência no **Local Storage**.

## ✨ Funcionalidades
- 🔍 Busca de usuários do **GitHub**
- 📂 Visualização de repositórios
- ⭐ Favoritar/Desfavoritar repositórios (com **persistência em Local Storage**)
- 📱 **Responsivo** para diferentes dispositivos
- ⚡ Utiliza **SSR** para otimização de performance
- 📌 Commits padronizados para manter a organização do código

## 🛠️ Tecnologias Utilizadas
- **Next.js 15** (com **App Router**)
- **TypeScript**
- **React**
- **Zustand** (Gerenciamento de estado global)
- **Axios**
- **TanStack/React Query**
- **TailwindCSS**
- **Jest** + **Testing Library**
- **Docker**

## 🐳 Executando com Docker
Para rodar o projeto utilizando Docker, utilize os seguintes comandos:

### Ambiente de Produção (PRD)
```sh
docker-compose build
docker-compose up -d
```

### Ambiente de Desenvolvimento (DEV)
```sh
docker-compose -f docker-compose.dev.yml up --build
```

## ⚙️ Configuração do Ambiente
Para executar o projeto localmente, é necessário criar um arquivo **`.env`** na raiz do projeto e adicionar a seguinte variável:

```sh
GITHUB_TOKEN=<seu_token_github>
```
🔗 **Como criar um token de acesso no GitHub?** Consulte a documentação oficial: [Criar Token no GitHub](https://docs.github.com/pt/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

---
