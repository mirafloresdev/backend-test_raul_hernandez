import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ProductoEntity } from "../model/producto.entity";
import { InventarioService } from "../service/inventario.service";

@Controller('api/inventario')
export class InventarioController {
  constructor(private readonly productoService: InventarioService) {}

  // Crear un nuevo producto
  @Post()
  async createProducto(@Body() productoData: ProductoEntity): Promise<ProductoEntity> {
    return await this.productoService.createProducto(productoData);
  }

  // Obtener todos los productos
  @Get()
  async findAllProductos(): Promise<ProductoEntity[]> {
    return await this.productoService.findAllProductos();
  }

  // Obtener un producto por ID
  @Get(':id')
  async findProductoById(@Param('id') id: number): Promise<ProductoEntity> {
    try {
      return await this.productoService.findProductoById(id);
    } catch (error) {
      throw new HttpException(`Producto no encontrado ${error}`, HttpStatus.NOT_FOUND);
    }
  }

  // Actualizar un producto por ID
  @Put(':id')
  async updateProducto(@Param('id') id: number, @Body() productoData: Partial<ProductoEntity>): Promise<ProductoEntity> {
    try {
      return await this.productoService.updateProducto(id, productoData);
    } catch (error) {
      throw new HttpException(`Error al actualizar ${error}`, HttpStatus.NOT_FOUND);
    }
  }

  // Eliminar un producto por ID
  @Delete(':id')
  async deleteProducto(@Param('id') id: number): Promise<void> {
    try {
      await this.productoService.deleteProducto(id);
    } catch (error) {
      throw new HttpException(`Producto no eliminado ${error}`, HttpStatus.NOT_FOUND);
    }
  }
}
