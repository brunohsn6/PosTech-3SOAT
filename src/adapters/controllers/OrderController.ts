import { Request, Response } from "express";
import { container } from "tsyringe";
import OrderDeleteUseCase from "../../application/use-cases/Order/OrderDeleteUseCase";
import OrderFindOneUseCase from "../../application/use-cases/Order/OrderFindOneUseCase";
import OrderListUseCase from "../../application/use-cases/Order/OrderListUseCase";
import OrderCreateUseCase from "../../application/use-cases/Order/OrderCreateUseCase";
import OrderUpdateStatusUseCase from "../../application/use-cases/Order/OrderUpdateStatusUseCase";
import { OrderStatus } from "../database/typeorm/entities/Order";

export default class OrderController {
  async create(request: Request, response: Response) {
      if (!request.body.name) {
          return response.status(400).json({ message: "Missing required data" })
      }
      const createOrderUseCase = container.resolve(OrderCreateUseCase)
      try {
        await createOrderUseCase.execute(request.body)

        return response.status(201).json({ message: "Order created successfully" })
      } catch (error: any) {
        return response.status(400).json({ message: error.message })
      }
  }

  async list(request: Request, response: Response) {
    const listOrderUseCase = container.resolve(OrderListUseCase)
    try {
      const orders = await listOrderUseCase.execute()

      return response.status(200).json(orders)
    } catch (error: any) {
      return response.status(400).json({ message: error.message })
    }
  }

  async findById(request: Request, response: Response) {

    const findOneOrderUseCase = container.resolve(OrderFindOneUseCase)
    try {
      const Order = await findOneOrderUseCase.execute(request.params.id)

      return response.status(200).json(Order)
    } catch (error: any) {
      return response.status(400).json({ message: error.message })
    }
  }

  async changeOrderStatus(request: Request, response: Response) {

    const findOneOrderUseCase = container.resolve(OrderUpdateStatusUseCase)
    try {
      const Order = await findOneOrderUseCase.execute(request.params.id, request.query.status as OrderStatus)

      return response.status(200).json({ message: 'Order updated successfully' })
    } catch (error: any) {
      return response.status(400).json({ message: error.message })
    }
  }

  async delete(request: Request, response: Response) {

    const deleteOrderUseCase = container.resolve(OrderDeleteUseCase)
    try {
      await deleteOrderUseCase.execute(request.params.id)

      return response.status(200).json({ message: "Order deleted successfully" })
    } catch (error: any) {
      return response.status(400).json({ message: error.message })
    }
  }

}