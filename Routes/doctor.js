import express from "express";
import { updateDoctor,   deleteDoctor, getSingleDoctor,getAllDoctor} from "../Controllers/doctorController.js";


const router = express.Router();

router.get("/", getAllDoctor);
router.get("/:id", getSingleDoctor);
router.delete("/:id", deleteDoctor);
router.put("/:id", updateDoctor);

export default router;