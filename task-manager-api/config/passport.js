import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { ObjectId } from "mongodb";
import { getDb } from "../db/conn.js";

dotenv.config();

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
} = process.env;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !GITHUB_CALLBACK_URL) {
  throw new Error(
    "Missing GitHub OAuth environment variables: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL"
  );
}

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const users = getDb().collection("users");

        const email =
          profile.emails?.[0]?.value?.toLowerCase() ||
          `${profile.username}@users.noreply.github.com`;

        const displayName =
          profile.displayName?.trim() || profile.username || "GitHub User";

        const nameParts = displayName.split(" ");
        const firstName = nameParts[0] || "GitHub";
        const lastName = nameParts.slice(1).join(" ") || "User";
        const githubId = profile.id;
        const githubUsername = profile.username || "";
        const avatarUrl = profile.photos?.[0]?.value || "";

        let user = await users.findOne({ githubId });

        if (user) {
          await users.updateOne(
            { _id: user._id },
            {
              $set: {
                displayName,
                firstName,
                lastName,
                email,
                githubUsername,
                avatarUrl,
                authProvider: "github",
                isActive: true,
                lastLoginAt: new Date(),
                updatedAt: new Date(),
              },
            }
          );

          user = await users.findOne({ _id: user._id });
          return done(null, user);
        }

        user = await users.findOne({ email });

        if (user) {
          await users.updateOne(
            { _id: user._id },
            {
              $set: {
                githubId,
                displayName,
                firstName,
                lastName,
                githubUsername,
                avatarUrl,
                authProvider: "github",
                isActive: true,
                lastLoginAt: new Date(),
                updatedAt: new Date(),
              },
            }
          );

          user = await users.findOne({ _id: user._id });
          return done(null, user);
        }

        const newUser = {
          displayName,
          firstName,
          lastName,
          email,
          role: "user",
          phone: "",
          isActive: true,
          githubId,
          githubUsername,
          avatarUrl,
          authProvider: "github",
          createdAt: new Date(),
          updatedAt: new Date(),
          lastLoginAt: new Date(),
        };

        const result = await users.insertOne(newUser);
        const insertedUser = await users.findOne({ _id: result.insertedId });

        return done(null, insertedUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    const users = getDb().collection("users");
    const user = await users.findOne({ _id: new ObjectId(id) });
    done(null, user || false);
  } catch (error) {
    done(error, null);
  }
});

export default passport;