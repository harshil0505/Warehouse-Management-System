import React, { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    orderId: "",
    orderDate: "",
    orderStatus: "",
    paymentStatus: "",
    shippingAddress: "",
    items: [
      { productId: "", quantity: "", price: "" }
    ]
  });

  // 🔄 Load Orders + Products
  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = () => {
    axios.get("http://localhost:8080/api/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  };

  const fetchProducts = () => {
    axios.get("http://localhost:8080/api/product/all")
      .then(res => setProducts(res.data));
  };

  // 📝 Handle Input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🧾 Handle Items
  const handleItemChange = (index, field, value) => {
    const newItems = [...form.items];
    newItems[index][field] = value;
    setForm({ ...form, items: newItems });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { productId: "", quantity: "", price: "" }]
    });
  };

  // ➕ Submit Order
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/orders", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      alert("Order Created ✅");
      fetchOrders();

    } catch (err) {
      console.error(err);
      alert("Error creating order");
    }
  };

  return (
    <div className="min-h-screen p-6 
      bg-gradient-to-br from-[#d1fae5] via-[#bbf7d0] to-[#86efac]">

      <h1 className="text-3xl font-bold text-green-800 mb-6">
        Order Management
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg mb-6">

        <div className="grid grid-cols-2 gap-4 mb-4">

          <input name="orderId" placeholder="Order ID"
            onChange={handleChange} className="input" required />

          <input type="date" name="orderDate"
            onChange={handleChange} className="input" required />

          <input name="orderStatus" placeholder="Order Status"
            onChange={handleChange} className="input" />

          <input name="paymentStatus" placeholder="Payment Status"
            onChange={handleChange} className="input" />

          <input name="shippingAddress"
            placeholder="Shipping Address"
            onChange={handleChange}
            className="input col-span-2" />

        </div>

        {/* ITEMS */}
        <h2 className="font-semibold mb-2">Order Items</h2>

        {form.items.map((item, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 mb-2">

            <select
              onChange={(e) =>
                handleItemChange(index, "productId", e.target.value)
              }
              className="input"
            >
              <option>Select Product</option>
              {products.map(p => (
                <option key={p.productId} value={p.productId}>
                  {p.productName}
                </option>
              ))}
            </select>

            <input type="number" placeholder="Qty"
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              className="input" />

            <input type="number" placeholder="Price"
              onChange={(e) =>
                handleItemChange(index, "price", e.target.value)
              }
              className="input" />

          </div>
        ))}

        <button type="button" onClick={addItem}
          className="bg-gray-200 px-3 py-1 rounded mb-4">
          + Add Item
        </button>

        <br />

        <button className="bg-green-600 text-white px-6 py-2 rounded">
          Create Order
        </button>

      </form>

      {/* TABLE */}
      <div className="bg-white p-5 rounded-xl shadow-lg">

        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Orders
        </h2>

        <table className="w-full text-sm">

          <thead>
            <tr className="bg-green-100">
              <th>Order ID</th>
              <th>Status</th>
              <th>Total</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="text-center border-b">
                <td>{o.orderId}</td>
                <td>{o.orderStatus}</td>
                <td>₹{o.totalAmount}</td>
                <td>{o.paymentStatus}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Order;