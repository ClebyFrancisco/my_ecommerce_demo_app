import api from '@/services/api';
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from 'react';

type ProductProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
};

const ProductsContext = createContext<{
  selectedProduct: ProductProps | null;
  cart: ProductProps[];
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductProps | null>>;
  setCart: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  removeFromCart: (id: string) => void;
}>({
  selectedProduct: null,
  cart: [],
  setSelectedProduct: () => {},
  setCart: () => {},
  removeFromCart: () => {},
});

export function useProducts() {
  const value = useContext(ProductsContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useProducts must be wrapped in a <ProductsProvider />');
    }
  }

  return value;
}

export function ProductsProvider({ children }: PropsWithChildren) {
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null,
  );
  const [cart, setCart] = useState<ProductProps[]>([]);

  const removeFromCart = async (id: string) => {
    api.delete(`/cart-items/${id}`);
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        cart,
        setCart,
        removeFromCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
