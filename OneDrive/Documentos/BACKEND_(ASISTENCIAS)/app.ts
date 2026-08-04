import { Application } from "https://deno.land/x/oak/mod.ts";
import {asistenciaRouter} from "./Routes/asistenciaRouter.ts"
import { oakCors } from "https://deno.land/x/cors/mod.ts";


const app = new Application();


app.use(oakCors());


app.use(asistenciaRouter.routes());
app.use(asistenciaRouter.allowedMethods());


console.log("Servidor corriendo por el puerto 8001");
await app.listen({ port: 8001 });
