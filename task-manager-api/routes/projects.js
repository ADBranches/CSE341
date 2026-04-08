import { Router } from "express";
import validateObjectId from "../middleware/validateObjectId.js";
import validateProject from "../validators/projectValidator.js";
import requireAuth from "../middleware/requireAuth.js";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/projectsController.js";

const router = Router();

router.get("/", getAllProjects);
router.get("/:id", validateObjectId("id", "project"), getProjectById);
/* #swagger.responses[201] = {
      description: 'Project created successfully'
   }
   #swagger.responses[400] = {
      description: 'Project validation failed'
   }
   #swagger.responses[500] = {
      description: 'Server error'
   }
*/
router.post("/", requireAuth, validateProject(false), createProject);
router.put("/:id", requireAuth, validateObjectId("id", "project"), validateProject(true), updateProject);
router.delete("/:id", requireAuth, validateObjectId("id", "project"), deleteProject);

export default router;