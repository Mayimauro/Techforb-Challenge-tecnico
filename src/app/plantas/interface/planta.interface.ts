import { SensorInterface } from './sensor.interface';

export interface plantaInterface {
  nombre: string;
  ubicacion: string;
  sensores: SensorInterface[];
}
