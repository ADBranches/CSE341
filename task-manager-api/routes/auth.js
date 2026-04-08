import { Router } from "express";
import passport from "passport";
import {
  getCurrentUser,
  logoutUser,
  authFailure,
  authSuccessRedirect,
} from "../controllers/authController.js";

const router = Router();

/* #swagger.tags = ['Auth']
   #swagger.summary = 'Start GitHub OAuth login'
   #swagger.description = 'Redirects the user to GitHub for authentication.'
*/
router.get(
  "/login",
  passport.authenticate("github", { scope: ["user:email"] })
);

/* #swagger.tags = ['Auth']
   #swagger.summary = 'GitHub OAuth callback'
   #swagger.description = 'GitHub redirects here after successful authentication. A session is created and the user is redirected to /auth/me.'
*/
router.get(
  "/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/failure",
    session: true,
  }),
  authSuccessRedirect
);

/* #swagger.tags = ['Auth']
   #swagger.summary = 'OAuth failure route'
*/
router.get("/failure", authFailure);

/* #swagger.tags = ['Auth']
   #swagger.summary = 'Get currently authenticated user'
   #swagger.description = 'Returns the currently authenticated user session. Requires successful OAuth login first.'
*/
router.get("/me", getCurrentUser);

/* #swagger.tags = ['Auth']
   #swagger.summary = 'Log out current user'
   #swagger.description = 'Ends the current authenticated session.'
*/
router.post("/logout", logoutUser);

export default router;