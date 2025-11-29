# syntax=docker/dockerfile:1.2

FROM node:24.11.1-alpine AS build
WORKDIR /app

ARG NUXT_PUBLIC_API_BASE
ENV NUXT_PUBLIC_API_BASE=${NUXT_PUBLIC_API_BASE}

RUN corepack enable

# Copy package.json and your lockfile, here we add pnpm-lock.yaml for illustration
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the entire project
COPY . ./

# Build the project
RUN pnpm run build

FROM nginx:1.29.3-alpine
WORKDIR /app

# Copy built static files to Nginx's html directory
COPY --from=build /app/.output/public /usr/share/nginx/html
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
