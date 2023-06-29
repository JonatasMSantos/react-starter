import { Product } from "../types/product";

export class ProductService {
  constructor() {
    return;
  }

  async newProduct(name: string): Promise<Product> {
    return {
      id: new Date().getTime(),
      name,
      price: 100,
      quantity: 1,
      time: new Date().toLocaleDateString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
  }
}
