import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetalleOrdenEntity } from "./detalle_orden.entity";

@Entity("t_producto")
export class ProductoEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column('int')
  stock: number;

  @OneToMany(() => DetalleOrdenEntity, detalleOrden => detalleOrden.producto,{eager:false})
  detalles: DetalleOrdenEntity[];

}