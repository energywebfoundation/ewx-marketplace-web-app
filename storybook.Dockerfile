ARG IMAGE=node:16.20-alpine

# Build stage
FROM $IMAGE as builder

RUN apk add --no-cache python3 py3-pip make g++

WORKDIR /usr/app

COPY ["package.json", "package-lock.json", "./"]

RUN npm ci

COPY . .

RUN npm run build-storybook

# Runner stage
FROM nginx:alpine as runner

WORKDIR /usr/app

COPY --from=builder /usr/app/storybook-static /usr/share/nginx/html
# COPY ./apps/ew-saas-ui/devops/nginx/ /etc/nginx/
