import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();

routes.post('/users',(new UserController).create)
routes.post('/login',(new UserController).login)
routes.get('/profile',(new UserController).getProfile)

export default routes;routes.post('/login',(new UserController).login)
