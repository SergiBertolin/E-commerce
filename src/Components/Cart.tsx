import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";

export default function Cart() {
  const { cartItems, increaseQuantity, decreaseQuantity,removeFromCart, open, setOpen } = useAppStore();

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)} 
        className="flex items-center gap-1 text-white hover:text-[#598392]"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="m2 3 .265.088c1.32.44 1.98.66 2.357 1.184C5 4.796 5 5.492 5 6.883V9.5c0 2.828 0 4.243.879 5.121.878.879 2.293.879 5.121.879h8"/>
          <path d="M7.5 18a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm9 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM5 6h11.45c2.055 0 3.083 0 3.527.674.445.675.04 1.619-.77 3.508l-.428 1c-.378.882-.567 1.322-.942 1.57-.376.248-.856.248-1.815.248H5"/>
        </svg>

        <span className="text-sm bg-red-600 rounded-full px-2 py-0.5 text-white">
          {cartItems.length}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg z-50 p-4">
          <h3 className="font-bold mb-4 text-[#598392]">Carrito</h3>

          {cartItems.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="grid grid-cols-5 items-center gap-2">
                  <img src={item.images[0]} alt={item.title} className="w-12 h-12 object-cover rounded" />
                  <span className="truncate">{item.title}</span>
                  <span>${item.price}</span>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => decreaseQuantity(item.id)} 
                      className="bg-gray-200 px-2 rounded hover:bg-gray-300">-</button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => increaseQuantity(item.id)} 
                      className="bg-gray-200 px-2 rounded hover:bg-gray-300">+</button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600">X</button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 border-t pt-2 flex justify-between font-bold text-[#598392]">
            <span>Total:</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>

          <button className="mt-4 w-full text-white py-2 rounded-lg bg-[#aec3b0] hover:bg-[#598392]">
            Pagar
          </button>
        </div>
      )}
    </div>
  );
}
