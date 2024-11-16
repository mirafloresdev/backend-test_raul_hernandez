import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
  HttpCode,
  NotFoundException
} from "@nestjs/common";
import { OrdenCompraEntity } from "../model/orden_compra.entity";
import { OrdenService } from "../service/orden.service";


@Controller('api/orden')
export class OrdenController {

  constructor(private readonly ordenCompraService: OrdenService) {}

  // Crear una nueva orden de compra
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrdenCompra(@Body() ordenCompraData: OrdenCompraEntity): Promise<OrdenCompraEntity> {
    return await this.ordenCompraService.createOrdenCompra(ordenCompraData);
  }

  // Obtener todas las órdenes de compra
  @Get()
  async getAllOrdenesCompra(): Promise<OrdenCompraEntity[]> {
    return await this.ordenCompraService.getAllOrdenesCompra();
  }

  // Obtener una orden de compra por ID
  @Get(':id')
  async getOrdenCompraById(@Param('id') id: number): Promise<OrdenCompraEntity> {
    try {
      return await this.ordenCompraService.getOrdenCompraById(id);
    } catch (error) {
      throw new HttpException(`Orden de compra no encontrada ${error}`, HttpStatus.NOT_FOUND);
    }
  }

  // Actualizar una orden de compra por ID
  @Put(':id')
  async updateOrdenCompra(@Param('id') id: number, @Body() ordenCompraData: Partial<OrdenCompraEntity>): Promise<OrdenCompraEntity> {
    try {
      return await this.ordenCompraService.updateOrdenCompra(id, ordenCompraData);
    } catch (error) {
      throw new HttpException(`Orden de compra no encontrada ${error}`, HttpStatus.NOT_FOUND);
    }
  }

  // Eliminar una orden de compra por ID
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrdenCompra(@Param('id') id: number): Promise<void> {
    try {
      await this.ordenCompraService.deleteOrdenCompra(id);
    } catch (error) {
      throw new HttpException(`Orden de compra no encontrada o no se pudo eliminar ${error}`, HttpStatus.NOT_FOUND);
    }
  }

  @Get('detallesByOrden/:id')
  async getOrdenCompra(@Param('id') id: number): Promise<OrdenCompraEntity> {
    const orden = await this.ordenCompraService.findOrdenById(id);
    if (!orden) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada.`);
    }
    return orden;
  }

}
