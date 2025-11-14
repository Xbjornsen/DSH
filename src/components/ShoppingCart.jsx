import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/pricingCalculator';

function ShoppingCart() {
  const { cart, removeFromCart, getTotalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
          <Link
            to="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Browse Designs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.demountable.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.demountable.description}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>

              {/* Configuration Summary */}
              <div className="border-t pt-4 space-y-2">
                <div className="text-sm">
                  <span className="text-gray-600">Dimensions: </span>
                  <span className="font-medium">
                    {(item.demountable.dimensions.length / 1000).toFixed(1)}m ×{' '}
                    {(item.demountable.dimensions.width / 1000).toFixed(1)}m ×{' '}
                    {(item.demountable.dimensions.height / 1000).toFixed(1)}m
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Material: </span>
                  <span className="font-medium capitalize">{item.demountable.material}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Roof Style: </span>
                  <span className="font-medium capitalize">{item.demountable.roofStyle}</span>
                </div>

                {/* Features Summary */}
                {item.pricing.featureBreakdown.length > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-600">Features: </span>
                    <span className="font-medium">
                      {item.pricing.featureBreakdown.length} items
                    </span>
                  </div>
                )}

                {/* Add-Ons Summary */}
                {item.pricing.addOnsBreakdown && item.pricing.addOnsBreakdown.length > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-600">Add-Ons: </span>
                    <span className="font-medium">
                      {item.pricing.addOnsBreakdown.length} items
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="border-t mt-4 pt-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">Added {new Date(item.addedAt).toLocaleDateString()}</span>
                <span className="text-2xl font-bold text-olive-700">
                  {formatCurrency(item.pricing.total)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Items</span>
                <span className="font-medium">{cart.length}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>Total</span>
                <span className="text-olive-700">{formatCurrency(getTotalPrice())}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-olive-600 hover:bg-olive-700 text-white text-center py-3 rounded-lg font-medium mb-3"
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={clearCart}
              className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-center py-2 rounded-lg font-medium"
            >
              Clear Cart
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              * Final pricing will be confirmed after site assessment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
