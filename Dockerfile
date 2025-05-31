FROM node:20.12.0-alpine3.19

WORKDIR /app
RUN npm i -g pnpm
COPY package.json  tsconfig.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .
RUN pnpm run build

EXPOSE 3000
CMD ["pnpm","start"]

