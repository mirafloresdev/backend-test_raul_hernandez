import { Module } from '@nestjs/common';
import { InventarioController } from './controller/inventario.controller';
import { InventarioService } from './service/inventario.service';
import { ProductoEntity } from "./model/producto.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdenService } from "./service/orden.service";
import { OrdenCompraEntity } from "./model/orden_compra.entity";
import { OrdenController } from './controller/orden.controller';

@Module({
  controllers: [InventarioController, OrdenController],
  providers: [InventarioService,OrdenService],
  imports: [
    TypeOrmModule.forFeature([OrdenCompraEntity]),
    TypeOrmModule.forFeature([ProductoEntity])],
})
export class InventarioModule {}
