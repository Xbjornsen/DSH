import React from 'react';
import { calculatePrice, formatCurrency } from '../utils/pricingCalculator';

function PricingPanel({ demountable }) {
  const pricing = calculatePrice(demountable);

  if (!pricing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Price Estimate</h2>
        <p className="text-gray-600">Unable to calculate pricing</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="text-2xl mr-2">💰</span>
        Price Estimate
      </h2>

      <div className="space-y-4">
        {/* Base Price */}
        <div className="border-b pb-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Base Price ({demountable.name})</span>
            <span className="text-gray-900 font-semibold">{formatCurrency(pricing.basePrice)}</span>
          </div>
        </div>

        {/* Size Adjustment */}
        {pricing.sizeAdjustment !== 0 && (
          <div className="border-b pb-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">
                Size Adjustment
                <span className="text-xs text-gray-500 block">
                  ({(demountable.dimensions.length / 1000).toFixed(1)}m × {(demountable.dimensions.width / 1000).toFixed(1)}m = {((demountable.dimensions.length / 1000) * (demountable.dimensions.width / 1000)).toFixed(1)}m²)
                </span>
              </span>
              <span className={`font-semibold ${pricing.sizeAdjustment > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {pricing.sizeAdjustment > 0 ? '+' : ''}{formatCurrency(pricing.sizeAdjustment)}
              </span>
            </div>
          </div>
        )}

        {/* Features */}
        {pricing.featureBreakdown.length > 0 && (
          <div className="border-b pb-3">
            <div className="font-medium text-gray-700 mb-2">Features</div>
            <div className="space-y-1 ml-3">
              {pricing.featureBreakdown.map((feature, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {feature.name} × {feature.quantity}
                    <span className="text-xs text-gray-400 ml-1">
                      (@{formatCurrency(feature.unitPrice)})
                    </span>
                  </span>
                  <span className="text-gray-700">{formatCurrency(feature.total)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center font-medium pt-1 border-t">
                <span className="text-gray-700">Features Subtotal</span>
                <span className="text-gray-900">{formatCurrency(pricing.featuresTotal)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Material */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700">
            Material
            <span className="text-xs text-gray-500 ml-1">({demountable.material})</span>
          </span>
          <span className="text-gray-900">
            {pricing.materialCost > 0 ? '+' + formatCurrency(pricing.materialCost) : 'Included'}
          </span>
        </div>

        {/* Roof Style */}
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-gray-700">
            Roof Style
            <span className="text-xs text-gray-500 ml-1">({demountable.roofStyle})</span>
          </span>
          <span className="text-gray-900">
            {pricing.roofStyleCost > 0 ? '+' + formatCurrency(pricing.roofStyleCost) : 'Included'}
          </span>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-700 font-medium">Subtotal</span>
          <span className="text-gray-900 font-semibold">{formatCurrency(pricing.subtotal)}</span>
        </div>

        {/* GST */}
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-gray-700">GST (10%)</span>
          <span className="text-gray-900">{formatCurrency(pricing.gst)}</span>
        </div>

        {/* Total */}
        <div className="bg-olive-50 rounded-lg p-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-olive-900">Total Price</span>
            <span className="text-2xl font-bold text-olive-700">{formatCurrency(pricing.total)}</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 text-xs text-gray-500 italic border-t pt-3">
          * This is an estimate only. Final pricing may vary based on site requirements, delivery location, and installation complexity. Contact us for a detailed quote.
        </div>
      </div>
    </div>
  );
}

export default PricingPanel;
