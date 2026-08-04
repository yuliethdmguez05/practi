import { conexion } from "./conexion.ts";

interface AsistenciaData{
    id_asistencia : number;
    fecha : string;
    hora_registro: string |null;
    estado: string;
    observaciones : string | null;
    id_horario : number;
}

export class Asistencia{

    public_ObjAsistencia : AsistenciaData | null;
    public_idAsistencia : number | null;

    constructor(ObjAsistencia : AsistenciaData | null = null, idAsistencia : number | null = null) {
        this.public_ObjAsistencia = ObjAsistencia;
        this.public_idAsistencia = idAsistencia;
    }

    public async SeleccionarAsistencias (): Promise<AsistenciaData[]> {
         
        const {rows:asistencias} = await conexion.execute (`SELECT * FROM asistencias`);
              return asistencias as AsistenciaData [];
    }

    public async SeleccionarAsistenciaPorId (): Promise<AsistenciaData | null> {

        const {rows: asistencias} = await conexion.execute (
            `SELECT * FROM  asistencias where id_asistencia =?`,
            [this.public_idAsistencia]
        );
        if (asistencias?.length === 0){
            return null;
        }
        return (asistencias as AsistenciaData []) [0] ;
    }

    public async InsertarAsistencias (): Promise<number>{
        
        const datos = this.public_ObjAsistencia;

        const resultado = await conexion.execute(
            `INSERT INTO asistencias (fecha, hora_registro, estado , observaciones ,id_horario) values (?, ?, ?, ?, ?)`,
            [datos?.fecha , datos?.hora_registro, datos?.estado, datos?.observaciones, datos?.id_horario]
        );
        return resultado.lastInsertId as number;
    }

    public async ActualizarAsistencias (): Promise<void>{

        const datos = this.public_ObjAsistencia;

        const resultado = await conexion.execute(
            `UPDATE asistencias SET fecha = ?, hora_registro = ?, estado = ?, observaciones = ?, id_horario = ? WHERE id_asistencia = ?`,
            [datos?.fecha , datos?.hora_registro, datos?.estado, datos?.observaciones, datos?.id_horario, this.public_idAsistencia]
        );
    }

    public async EliminarAsistencias (): Promise<void>{

        await conexion.execute(
            `DELETE FROM asistencias WHERE id_asistencia =?`,
            [this.public_idAsistencia]

        );
    }
}