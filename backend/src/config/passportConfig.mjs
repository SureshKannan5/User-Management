import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/userModel.mjs";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "MERN_USER_MANAGEMENT",
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = User.findById(jwt_payload.sub).exec();

      if (!user) {
        return done("user is not exist", false);
      }

      return done(null, user);
    } catch (error) {
      return done("User is not authorized", false);
    }
  })
);

export default passport;
