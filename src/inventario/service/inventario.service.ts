import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ProductoEntity } from "../model/producto.entity";
import { Repository } from "typeorm";

@Injectable()
export class InventarioService {

  constructor(
    @InjectRepository(ProductoEntity)
    private productoRepository: Repository<ProductoEntity>,
  ) {}

  // Crear un nuevo producto
  async createProducto(productoData: Partial<ProductoEntity>): Promise<ProductoEntity> {
    const producto = this.productoRepository.create(productoData);
    return await this.productoRepository.save(producto);
  }

  // Obtener todos los productos
  async findAllProductos(): Promise<ProductoEntity[]> {
    return await this.productoRepository.find();
  }

  // Obtener un producto por ID
  async findProductoById(id: number): Promise<ProductoEntity> {
    return await this.productoRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  // Actualizar un producto por ID
  async updateProducto(id: number, productoData: Partial<ProductoEntity>): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOne({
      where:{
        id:id
      }
    });
    this.productoRepository.merge(producto, productoData);
    return await this.productoRepository.save(producto);
  }

  // Eliminar un producto por ID
  async deleteProducto(id: number): Promise<void> {
    await this.productoRepository.delete(id);
  }
}
