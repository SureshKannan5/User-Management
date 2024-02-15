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
      const user = await User.findById(jwt_payload.sub).populate([
        "role",
        "organization",
      ]);

      if (!user) {
        return done("user is not exist", false);
      }

      return done(null, user);
    } catch (error) {
      console.log(error);
      return done("Internal server error", false);
    }
  })
);

export default passport;
