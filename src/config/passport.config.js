import passport from "passport";
import config from "./config.js";
import auth from "../services/auth.js";
import { UserService } from "../services/index.js";
import { CartService } from "../services/index.js";
import { Strategy as LocalStrategy} from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

const initializePassportStrategies = () => {
    passport.use(
      "register",
      new LocalStrategy(
        { passReqToCallback: true, usernameField: "email", session: false }, async (req, email, password, done) => {
          try {
            const { firstName, lastName } = req.body;
            if (!firstName || !lastName)
              return done(null, false, { message: "Incomplete values" });
  
            const exists = await UserService.getUserById({ email });
            if (exists)
              return done(null, false, { message: "User already exists" });
  
            const hashedPassword = await auth.createHash(password);
  
            const newUser = {
              firstName,
              lastName,
              email,
              password: hashedPassword,
            };
  
            let cart;
            if (req.cookies["cart"]) {
              cart = req.cookies["cart"];
            } else {
              const cartResult = await CartService.createCart();
              cart = cartResult.id;
            }
            newUser.cart = cart;
  
            const result = await UserService.createUser(newUser);
            return done(null, result);
          } catch (error) {
            console.log(error);
            return done(error);
          }
        }
      )
    );
  
    passport.use(
      "login",
      new LocalStrategy(
        { usernameField: "email", session: false },
        async (email, password, done) => {
          try {
            if (email === config.app.ADMIN_EMAIL && password === config.app.ADMIN_PASSWORD) {
              const adminUser = {
                id: "0",
                firstName: "Administrator",
                lastName:"CS",
                email:"admincs@gmail.com",
                role: "admin",
              };
              return done(null, adminUser);
            }
  
            const user = await UserService.getUserById({ email })
            if (!user)
              return done(null, false, { message: "Invalid Credentials" });
  
            const isValidPassword = await auth.validatePassword(password,user.password);
            if (!isValidPassword)
              return done(null, false, { message: "Invalid Credentials" });
            return done(null, user);
          } catch (error) {
            console.log(error);
            return done(error);
          }
        }
      )
    );
  
    passport.use(
      "jwt",
      new JWTStrategy(
        {
          jwtFromRequest: ExtractJwt.fromExtractors([auth.extractAuthToken]),
          secretOrKey: config.jwt.SECRET
        },
        async (payload, done) => {
          console.log("Received JWT Token:", payload);  
          try {
            if (payload.role === "admin") {
              return done(null, payload);
            }
            const user = await UserService.getUserById({ _id: payload.id });
            console.log("User from JWT:", user);
            return done(null, user);
          } catch (error) {
            console.error("Error en la estrategia JWT:", error);
            return done(error);
          }
        }
      )
    );
    
  };
  
  export default initializePassportStrategies;