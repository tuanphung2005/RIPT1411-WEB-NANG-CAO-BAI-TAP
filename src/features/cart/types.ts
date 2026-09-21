export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

export interface CartState {
  items: CartItem[];
}

export interface UpdateQuantityPayload {
  id: number;
  quantity: number;
}
