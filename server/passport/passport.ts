import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as NaverStrategy } from "passport-naver";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import User from "../sequelize/models/user.model";
import secretConfig from "./config.secret";
import { UserInterface } from "../interface/interface";

const passportConfig = (): void => {
  passport.serializeUser((user: UserInterface, done) => {
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
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "Incorrect id." });
            }
            bcrypt
              .compare(password, user.password)
              .then((result) => {
                if (!result) {
                  return done(null, false, { message: "Incoreect password." });
                }
                return done(null, user);
              })
              .catch((err) => {
                return done(err);
              });
            return done(null, user);
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );

  passport.use(
    new NaverStrategy(
      secretConfig.naver,
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ where: { email: profile.emails[0].value } })
          .then((user) => {
            if (!user) {
              const createUser = new User({
                email: profile.emails[0].value,
                nickname: profile.displayName,
                password: "naver_provided",
              });

              createUser
                .save()
                .then(() => {
                  return done(null, createUser);
                })
                .catch((err) => {
                  return done(err, createUser);
                });
            }
            return done(null, user);
          })
          .catch((err) => {
            return done(err, null);
          });
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      secretConfig.google,
      (accessToken, refreshToken, profile, cb) => {
        User.findOne({ where: { email: profile.id } })
          .then((user) => {
            if (!user) {
              const createUser = new User({
                email: profile.id,
                nickname: profile.displayName,
                password: "google_provided",
              });

              createUser
                .save()
                .then(() => {
                  return cb(null, createUser);
                })
                .catch((err) => {
                  return cb(err, createUser);
                });
            }
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
