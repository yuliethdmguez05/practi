import { Asistencia } from "../Model/asistenciaModel.ts";

// deno-lint-ignore no-explicit-any
export const getAsistencia = async (ctx: any) => {
    const { response, params } = ctx;

    try {
        const ObjAsistencia = new Asistencia();

        if (params.id) {
            const id = Number(params.id);
            const ObjAsistenciaConId = new Asistencia(null, id);
            const asistencia = await ObjAsistenciaConId.SeleccionarAsistenciaPorId();

            if (asistencia === null) {
                response.status = 404;
                response.body = { success: false, message: "Asistencia no encontrada" };
                return;
            }

            response.status = 200;
            response.body = { success: true, data: asistencia };
            return;
        }

        const ListaAsistencias = await ObjAsistencia.SeleccionarAsistencias();
        response.status = 200;
        response.body = { success: true, data: ListaAsistencias };
    } catch (error) {
        response.status = 400;
        response.body = { success: false, message: "Error al procesar la solicitud", errors: error };
    }
};

// deno-lint-ignore no-explicit-any
export const postAsistencia = async (ctx: any) => {
    const { request, response } = ctx;

    try {
        if (!request.hasBody) {
            response.status = 400;
            response.body = { success: false, message: "No se enviaron datos en la solicitud" };
            return;
        }

        const datos = await request.body.json();
        const ObjAsistencia = new Asistencia(datos);
        const idGenerado = await ObjAsistencia.InsertarAsistencias();

        response.status = 201;
        response.body = { success: true, message: "Asistencia registrada correctamente", data: { id_asistencia: idGenerado } };
    } catch (error) {
        response.status = 400;
        response.body = { success: false, message: "Error al registrar la asistencia", errors: error };
    }
};

// deno-lint-ignore no-explicit-any
export const putAsistencia = async (ctx: any) => {
    const { request, response, params } = ctx;

    try {
        const id = Number(params.id);

        if (!request.hasBody) {
            response.status = 400;
            response.body = { success: false, message: "No se enviaron datos en la solicitud" };
            return;
        }

        const datos = await request.body.json();
        const ObjAsistencia = new Asistencia(datos, id);
        await ObjAsistencia.ActualizarAsistencias();

        response.status = 200;
        response.body = { success: true, message: "Asistencia actualizada correctamente" };
    } catch (error) {
        response.status = 400;
        response.body = { success: false, message: "Error al actualizar la asistencia", errors: error };
    }
};

// deno-lint-ignore no-explicit-any
export const deleteAsistencia = async (ctx: any) => {
    const { response, params } = ctx;

    try {
        const id = Number(params.id);
        const ObjAsistencia = new Asistencia(null, id);
        await ObjAsistencia.EliminarAsistencias();

        response.status = 200;
        response.body = { success: true, message: "Asistencia eliminada correctamente" };
    } catch (error) {
        response.status = 400;
        response.body = { success: false, message: "Error al eliminar la asistencia", errors: error };
    }
};