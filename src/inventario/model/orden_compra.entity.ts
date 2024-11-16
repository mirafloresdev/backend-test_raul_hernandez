import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetalleOrdenEntity } from './detalle_orden.entity';

@Entity('t_orden_compra')
export class OrdenCompraEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  fecha_orden: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_orden: number;

  @Column({ type: 'varchar', length: 20 })
  estado: string;

  @OneToMany(
    () => DetalleOrdenEntity,
    (detalleOrden) => detalleOrden.ordenCompra,
    { eager: true, cascade: true },
  )
  detalles: DetalleOrdenEntity[];
}
