import { register } from "../controllers/auth.controller"
import express, { Router } from "express"
const router: Router = express.Router()

//REGISTER A USER
router.post("/register", register)

//LOGIN A USER
router.post("/login", )


export default router