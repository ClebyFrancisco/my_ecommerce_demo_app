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
};

const ProductsContext = createContext<{
  selectedProduct: ProductProps | null;
  cart: ProductProps[];
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductProps | null>>;
  setCart: React.Dispatch<React.SetStateAction<ProductProps[]>>;
}>({
  selectedProduct: null,
  cart: [],
  setSelectedProduct: () => {},
  setCart: () => {},
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

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <ProductsContext.Provider
      value={{ selectedProduct, setSelectedProduct, cart, setCart }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
