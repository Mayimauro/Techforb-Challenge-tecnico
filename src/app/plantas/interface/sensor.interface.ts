import {LecturaSensorInterface} from './lectura-sensor.interface';

export interface SensorInterface {
  id: number;
  tipo: string;
  lecturaSensor: LecturaSensorInterface[];
}
