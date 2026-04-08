import { Router } from "express";
import validateObjectId from "../middleware/validateObjectId.js";
import validateProject from "../validators/projectValidator.js";
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
router.post("/", validateProject(false), createProject);
router.put("/:id", validateObjectId("id", "project"), validateProject(true), updateProject);
router.delete("/:id", validateObjectId("id", "project"), deleteProject);

export default router;