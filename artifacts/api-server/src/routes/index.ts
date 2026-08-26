import { Router, type IRouter } from "express";
import healthRouter from "./health";
import globaltalkRouter from "./globaltalk";

const router: IRouter = Router();

router.use(healthRouter);
router.use(globaltalkRouter);

export default router;
