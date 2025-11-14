import React from 'react';
import { Link } from 'react-router-dom';

function Services() {
  const services = [
    {
      icon: '🏗️',
      title: 'Demountable Buildings',
      description: 'Custom-designed modular demountable buildings for commercial, industrial, and residential applications.',
      features: [
        'Laundry facilities',
        'Gymnasium spaces',
        'Accommodation units',
        'Office spaces',
        'Storage facilities',
        'Custom designs'
      ]
    },
    {
      icon: '🚚',
      title: 'Delivery & Installation',
      description: 'Professional delivery and installation services across the Northern Territory and beyond.',
      features: [
        'Site preparation consultation',
        'Transport and logistics',
        'Professional installation',
        'Compliance certification',
        'Safety inspections'
      ]
    },
    {
      icon: '🔧',
      title: 'Hire Services',
      description: 'Flexible short-term and long-term hire options for temporary building needs.',
      features: [
        'Short-term hire (1-6 months)',
        'Long-term hire (6+ months)',
        'Rent-to-own options',
        'Maintenance included',
        'Quick deployment'
      ]
    },
    {
      icon: '⚙️',
      title: 'Customization',
      description: 'Fully customizable demountables tailored to your specific requirements.',
      features: [
        'Custom dimensions',
        'Interior fit-outs',
        'Electrical upgrades',
        'Plumbing installations',
        'HVAC systems',
        'Security features'
      ]
    },
    {
      icon: '🛠️',
      title: 'Maintenance & Support',
      description: 'Ongoing maintenance and support services to keep your demountable in top condition.',
      features: [
        'Regular inspections',
        'Repairs and maintenance',
        'Upgrades and modifications',
        'Emergency call-outs',
        '24/7 support available'
      ]
    },
    {
      icon: '📋',
      title: 'Consulting',
      description: 'Expert consultation to help you choose the right demountable solution for your needs.',
      features: [
        'Site assessments',
        'Design consultation',
        'Compliance advice',
        'Budget planning',
        'Project management',
        'ROI analysis'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-olive-600 to-olive-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-3xl">
            DS&H provides comprehensive demountable building solutions across the Northern Territory.
            From design to delivery, we've got you covered.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-olive-600 mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose DS&H?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-bold mb-2">Quality Assured</h3>
              <p className="text-gray-600 text-sm">
                All our demountables are built to Australian standards with premium materials
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Quick turnaround times with efficient logistics across NT
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-bold mb-2">Competitive Pricing</h3>
              <p className="text-gray-600 text-sm">
                Fair pricing with transparent quotes and no hidden fees
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="font-bold mb-2">Local Expertise</h3>
              <p className="text-gray-600 text-sm">
                Over 20 years serving the Northern Territory community
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6">
            Design your perfect demountable building today or contact us for expert consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium text-lg"
            >
              Browse Designs
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-olive-600 hover:bg-olive-700 text-white px-8 py-3 rounded-lg font-medium text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Service Areas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <h4 className="font-semibold">Darwin</h4>
            </div>
            <div className="p-4">
              <h4 className="font-semibold">Palmerston</h4>
            </div>
            <div className="p-4">
              <h4 className="font-semibold">Katherine</h4>
            </div>
            <div className="p-4">
              <h4 className="font-semibold">Alice Springs</h4>
            </div>
            <div className="p-4">
              <h4 className="font-semibold">Nhulunbuy</h4>
            </div>
            <div className="p-4">
              <h4 className="font-semibold">Tennant Creek</h4>
            </div>
            <div className="p-4">
              <h4 className="font-semibold">Remote Areas</h4>
            </div>
            <div className="p-4">
              <h4 className="font-semibold">Interstate (POA)</h4>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-6">
            Can't find your location? <Link to="/contact" className="text-blue-600 hover:underline">Contact us</Link> to discuss delivery options.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
