import { Router } from "../Dependencies/dependencias.ts";
import {getAsistencia,postAsistencia,putAsistencia,deleteAsistencia} from "../controller/asistenciaController.ts";

const asistenciaRouter = new Router();

asistenciaRouter.get("/asistencias" , getAsistencia);
asistenciaRouter.get("/asistencias/:id", getAsistencia);
asistenciaRouter.post("/asistencias" , postAsistencia);
asistenciaRouter.put("/asistencias/:id" , putAsistencia);
asistenciaRouter.delete("/asistencias/:id" , deleteAsistencia);

export {asistenciaRouter};