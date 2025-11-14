import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/pricingCalculator';

function AdminPortal() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, contacted, completed

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    if (selectedOrder && selectedOrder.orderId === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const deleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      const updatedOrders = orders.filter(order => order.orderId !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      if (selectedOrder && selectedOrder.orderId === orderId) {
        setSelectedOrder(null);
      }
    }
  };

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(order => order.status === filter);

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      contacted: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status] || styles.pending}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Portal</h1>
        <p className="text-gray-600">Manage quote requests and orders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-3">Quote Requests ({filteredOrders.length})</h2>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  All ({orders.length})
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter('contacted')}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    filter === 'contacted' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Contacted
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No orders found</p>
              ) : (
                filteredOrders.map((order) => (
                  <div
                    key={order.orderId}
                    onClick={() => setSelectedOrder(order)}
                    className={`p-3 rounded cursor-pointer border transition-colors ${
                      selectedOrder?.orderId === order.orderId
                        ? 'bg-blue-50 border-blue-500'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-sm">{order.orderId}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="text-sm text-gray-600">{order.fullName}</div>
                    <div className="text-sm text-gray-600">{order.email}</div>
                    <div className="text-sm font-semibold text-olive-700 mt-1">
                      {formatCurrency(order.totalPrice)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(order.submittedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Order Details</h2>
                  <p className="text-gray-600">{selectedOrder.orderId}</p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => updateOrderStatus(selectedOrder.orderId, e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    onClick={() => deleteOrder(selectedOrder.orderId)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Customer Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
                  <div>
                    <span className="text-sm text-gray-600">Name:</span>
                    <p className="font-medium">{selectedOrder.fullName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    <p className="font-medium">{selectedOrder.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Phone:</span>
                    <p className="font-medium">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Company:</span>
                    <p className="font-medium">{selectedOrder.company || 'N/A'}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-gray-600">Delivery Address:</span>
                    <p className="font-medium">
                      {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state} {selectedOrder.postcode}
                    </p>
                  </div>
                  {selectedOrder.deliveryDate && (
                    <div>
                      <span className="text-sm text-gray-600">Preferred Delivery:</span>
                      <p className="font-medium">{new Date(selectedOrder.deliveryDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  {selectedOrder.notes && (
                    <div className="col-span-2">
                      <span className="text-sm text-gray-600">Notes:</span>
                      <p className="font-medium">{selectedOrder.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Cart Items */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Demountable Configuration</h3>
                <div className="space-y-4">
                  {selectedOrder.cart.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-2">{item.demountable.name}</h4>

                      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                        <div>
                          <span className="text-gray-600">Dimensions:</span>
                          <p className="font-medium">
                            {(item.demountable.dimensions.length / 1000).toFixed(1)}m ×{' '}
                            {(item.demountable.dimensions.width / 1000).toFixed(1)}m ×{' '}
                            {(item.demountable.dimensions.height / 1000).toFixed(1)}m
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Material:</span>
                          <p className="font-medium capitalize">{item.demountable.material}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Roof Style:</span>
                          <p className="font-medium capitalize">{item.demountable.roofStyle}</p>
                        </div>
                      </div>

                      {/* Pricing Breakdown */}
                      <div className="bg-gray-50 rounded p-3">
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Base Price:</span>
                            <span className="font-medium">{formatCurrency(item.pricing.basePrice)}</span>
                          </div>
                          {item.pricing.featuresTotal > 0 && (
                            <div className="flex justify-between">
                              <span>Features:</span>
                              <span className="font-medium">{formatCurrency(item.pricing.featuresTotal)}</span>
                            </div>
                          )}
                          {item.pricing.addOnsTotal > 0 && (
                            <div className="flex justify-between">
                              <span>Add-Ons:</span>
                              <span className="font-medium">{formatCurrency(item.pricing.addOnsTotal)}</span>
                            </div>
                          )}
                          <div className="flex justify-between border-t pt-1 font-bold">
                            <span>Total (inc. GST):</span>
                            <span className="text-olive-700">{formatCurrency(item.pricing.total)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-olive-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Order Total:</span>
                    <span className="text-2xl font-bold text-olive-700">
                      {formatCurrency(selectedOrder.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPortal;
