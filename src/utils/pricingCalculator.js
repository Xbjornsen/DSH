import pricingConfig from '../data/pricingConfig.json';
import architecturalOptions from '../data/architecturalOptions.json';

export const calculatePrice = (demountable) => {
  if (!demountable) return null;

  const breakdown = {
    basePrice: 0,
    sizeAdjustment: 0,
    featuresTotal: 0,
    materialCost: 0,
    roofStyleCost: 0,
    addOnsTotal: 0,
    featureBreakdown: [],
    addOnsBreakdown: [],
    subtotal: 0,
    gst: 0,
    total: 0
  };

  // Base price based on type
  breakdown.basePrice = pricingConfig.basePrices[demountable.type] || 0;

  // Calculate area in square meters
  const area = (demountable.dimensions.length / 1000) * (demountable.dimensions.width / 1000);
  const baseArea = pricingConfig.baseAreaThresholds[demountable.type] || area;

  // Size adjustment (if area differs from base design)
  if (area !== baseArea) {
    const areaDifference = area - baseArea;
    breakdown.sizeAdjustment = areaDifference * pricingConfig.pricePerSquareMeter;
  }

  // Features cost
  if (demountable.features) {
    Object.entries(demountable.features).forEach(([feature, quantity]) => {
      const unitPrice = pricingConfig.features[feature] || 0;
      const featureCost = unitPrice * quantity;

      if (featureCost > 0) {
        breakdown.featureBreakdown.push({
          name: formatFeatureName(feature),
          quantity,
          unitPrice,
          total: featureCost
        });
        breakdown.featuresTotal += featureCost;
      }
    });
  }

  // Material cost
  breakdown.materialCost = pricingConfig.materials[demountable.material] || 0;

  // Roof style cost
  breakdown.roofStyleCost = pricingConfig.roofStyles[demountable.roofStyle] || 0;

  // Add-ons cost
  if (demountable.addOns) {
    const area = (demountable.dimensions.length / 1000) * (demountable.dimensions.width / 1000);

    // Array-based add-ons (windows, doors, verandahs, airConditioning, security)
    ['windows', 'doors', 'verandahs', 'airConditioning', 'security'].forEach(category => {
      const items = demountable.addOns[category] || [];
      items.forEach(item => {
        const option = architecturalOptions[category]?.options.find(opt => opt.id === item.id);
        if (option) {
          const itemTotal = option.price * item.quantity;
          breakdown.addOnsBreakdown.push({
            category: architecturalOptions[category].name,
            name: option.label,
            quantity: item.quantity,
            unitPrice: option.price,
            total: itemTotal
          });
          breakdown.addOnsTotal += itemTotal;
        }
      });
    });

    // Single-select add-ons (insulation, colors, electrical)
    ['insulation', 'colors', 'electrical'].forEach(category => {
      const selectedId = demountable.addOns[category];
      if (selectedId) {
        const option = architecturalOptions[category]?.options.find(opt => opt.id === selectedId);
        if (option && option.price > 0) {
          breakdown.addOnsBreakdown.push({
            category: architecturalOptions[category].name,
            name: option.label,
            quantity: 1,
            unitPrice: option.price,
            total: option.price
          });
          breakdown.addOnsTotal += option.price;
        }
      }
    });

    // Flooring (priced per square meter)
    if (demountable.addOns.flooring) {
      const option = architecturalOptions.flooring?.options.find(
        opt => opt.id === demountable.addOns.flooring
      );
      if (option) {
        const flooringTotal = option.price * area;
        breakdown.addOnsBreakdown.push({
          category: architecturalOptions.flooring.name,
          name: option.label,
          quantity: area.toFixed(1) + ' m²',
          unitPrice: option.price,
          total: flooringTotal
        });
        breakdown.addOnsTotal += flooringTotal;
      }
    }
  }

  // Calculate subtotal
  breakdown.subtotal =
    breakdown.basePrice +
    breakdown.sizeAdjustment +
    breakdown.featuresTotal +
    breakdown.materialCost +
    breakdown.roofStyleCost +
    breakdown.addOnsTotal;

  // Calculate GST (10%)
  breakdown.gst = breakdown.subtotal * 0.1;

  // Calculate total
  breakdown.total = breakdown.subtotal + breakdown.gst;

  return breakdown;
};

const formatFeatureName = (feature) => {
  // Convert camelCase to Title Case with spaces
  return feature
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};
