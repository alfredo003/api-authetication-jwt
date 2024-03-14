import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

routes.post('/users',(new UserController).create)
routes.post('/login',(new UserController).login)

routes.use(authMiddleware);
routes.get('/profile',(new UserController).getProfile)
routes.get('/home',(new UserController).home)

export default routes;
