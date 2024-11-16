import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OrdenCompraEntity } from "./orden_compra.entity";
import { ProductoEntity } from "./producto.entity";

@Entity('t_det_orden_compra')
export class DetalleOrdenEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  id_orden: number;

  @Column({ type: 'int' })
  id_producto: number;

  @Column('int')
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sub_total: number;

  @ManyToOne(() => OrdenCompraEntity, ordenCompra => ordenCompra.detalles)
  @JoinColumn({ name: 'id_orden' })
  ordenCompra: OrdenCompraEntity;

  @ManyToOne(() => ProductoEntity, producto => producto.detalles)
  @JoinColumn({ name: 'id_producto' })
  producto: ProductoEntity;
}