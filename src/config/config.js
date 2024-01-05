import dotenv from 'dotenv'
import { Command } from 'commander';

const program = new Command();
program
  .option("-m, --mode <mode>", "Modo de trabajo", "production")
  .option("-p <port>", "Puerto del servidor", 8080);

program.parse();

dotenv.config({
  path: program.opts().mode === "dev" ? "./.env.dev" : "./.env.prod",
});

export default {
  app: {
    PORT: process.env.PORT || 8080,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
  },
  mongo: {
    URL: process.env.MONGO_URL
  },
  jwt: {
    COOKIE: process.env.JWT_COOKIE,
    SECRET: process.env.JWT_SECRET || "jwtSecret",
  },
  mailer: {
    USER: process.env.NODE_MAILER_USER,
    PASS: process.env.NODE_MAILER_PASSWORD,
  }
};