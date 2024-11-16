import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdenCompraEntity } from "../model/orden_compra.entity";

@Injectable()
export class OrdenService {

  constructor(
    @InjectRepository(OrdenCompraEntity)
    private ordenCompraRepository: Repository<OrdenCompraEntity>,
  ) {}

  // Crear una nueva orden de compra
  async createOrdenCompra(data: Partial<OrdenCompraEntity>): Promise<OrdenCompraEntity> {
    const nuevaOrden = this.ordenCompraRepository.create(data);
    return await this.ordenCompraRepository.save(nuevaOrden);
  }

  // Obtener todas las órdenes de compra
  async getAllOrdenesCompra(): Promise<OrdenCompraEntity[]> {
    return await this.ordenCompraRepository.find();
  }

  // Obtener una orden de compra por ID
  async getOrdenCompraById(id: number): Promise<OrdenCompraEntity> {
    return await this.ordenCompraRepository.findOne({
      where:{
        id:id
      }
    });
  }

  // Actualizar una orden de compra por ID
  async updateOrdenCompra(id: number, data: Partial<OrdenCompraEntity>): Promise<OrdenCompraEntity> {
    const orden = await this.ordenCompraRepository.findOne({
      where:{
        id:id
      }
    });
    if (!orden) {
      throw new Error('Orden de compra no encontrada');
    }
    this.ordenCompraRepository.merge(orden, data);
    return await this.ordenCompraRepository.save(orden);
  }

  // Eliminar una orden de compra por ID
  async deleteOrdenCompra(id: number): Promise<void> {
    await this.ordenCompraRepository.delete(id);
  }

  async findOrdenById(id: number): Promise<OrdenCompraEntity> {
    return await this.ordenCompraRepository.findOne({
      where: { id },
      relations: ['detalles', 'detalles.producto']
    });
  }
}
