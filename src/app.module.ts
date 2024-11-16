import { Module } from '@nestjs/common';
import { InventarioModule } from './inventario/inventario.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdenService } from './inventario/service/orden.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dev',
      password: 'postgres',
      database: 'inventario_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),

    InventarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
