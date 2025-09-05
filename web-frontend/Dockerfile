# ---------- Builder : construit l'app avec PNPM ----------
    FROM node:20-alpine AS builder

    RUN corepack enable && corepack prepare pnpm@latest --activate
    
    WORKDIR /app
    
    # Copier les manifestes en premier
    COPY package.json pnpm-lock.yaml ./
    
    # Installation en mode reproductible (respecte pnpm-lock.yaml)
    RUN pnpm install --frozen-lockfile
    
    # Copier le reste du code
    COPY . .
    
    # Build de production (Vite) + types
    # - Vite met la build dans /app/dist
    RUN pnpm build
    
    # ---------- Runner : Nginx sert la SPA ----------
    FROM nginx:1.27-alpine AS runner
    
    # Nginx conf custom (SPA + gzip + cache statique)
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Copier la build vers le dossier servi par Nginx
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    
    
    EXPOSE 3000
    
    # Healthcheck léger (vérifie que la page racine répond)
    
    CMD ["nginx", "-g", "daemon off;"]