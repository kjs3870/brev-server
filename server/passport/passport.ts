import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as NaverStrategy } from "passport-naver";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import User from "../sequelize/models/user.model";
import AppConfig from "../config/config.secret";

const passportConfig = (): void => {
  passport.serializeUser((user: User, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email: string, done) => {
    User.findOne({ where: { email } })
      .then((user) => {
        done(null, user);
      })
      .catch((err) => console.log(err));
  });

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        User.findOne({ where: { email } })
          .then(async (user) => {
            if (!user) {
              return done(null, false, {
                message: "Incorrect id.",
              });
            }

            const pwdCompareResult = await bcrypt
              .compare(password, user.password)
              .catch((err) => console.error(err));

            if (pwdCompareResult) return done(null, user);
            return done(null, false, { message: "Incorrect password!" });
          })
          .catch(() => {
            return done(null, false);
          });
      }
    )
  );

  passport.use(
    new NaverStrategy(
      AppConfig.naver,
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ where: { email: profile.emails[0].value } })
          .then(async (user) => {
            let isCreated = false;
            let createUser: User;
            if (!user) {
              createUser = new User({
                email: profile.emails[0].value,
                nickname: profile.displayName,
                password: "naver_provided",
              });

              await createUser.save().catch((err) => {
                console.error(err);
              });

              isCreated = true;
            } else if (user.password !== "naver_provided")
              return done(null, false, { message: "Not a naver account." });

            if (isCreated)
              return done(null, false, { message: "Sign up success!" });
            return done(null, user);
          })
          .catch(() => {
            return done(null, false);
          });
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      AppConfig.google,
      (accessToken, refreshToken, profile, cb) => {
        User.findOne({ where: { email: profile.emails[0].value } })
          .then(async (user) => {
            let isCreated = false;
            let createUser: User;
            if (!user) {
              createUser = new User({
                email: profile.emails[0].value,
                nickname: profile.displayName,
                password: "google_provided",
              });

              await createUser.save().catch((err) => {
                console.error(err);
              });

              isCreated = true;
            } else if (user.password !== "google_provided")
              return cb(null, false, { message: "Not a google account." });

            if (isCreated)
              return cb(null, false, { message: "Sign up success!" });
            return cb(null, user);
          })
          .catch((err) => {
            return cb(err, null);
          });
      }
    )
  );
};

export default passportConfig;
