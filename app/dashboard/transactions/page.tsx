"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Product = {
  id: number;
  name: string;
  stock: number;
};

type ItemRow = {
  productId: number;
  quantity: number;
};

export default function TransactionsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [type, setType] = useState<"IN" | "OUT">("IN");
  const [items, setItems] = useState<ItemRow[]>([
    { productId: 0, quantity: 1 },
  ]);
  const [message, setMessage] = useState("");

  const loadProducts = async () => {
    const data = await apiFetch("/products");
    setProducts(data);
    if (data.length && items[0].productId === 0) {
      setItems([{ productId: data[0].id, quantity: 1 }]);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddRow = () => {
    setItems((prev) => [
      ...prev,
      {
        productId: products[0]?.id || 0,
        quantity: 1,
      },
    ]);
  };

  const handleChangeRow = (
    index: number,
    field: keyof ItemRow,
    value: number
  ) => {
    const copy = [...items];
    copy[index] = { ...copy[index], [field]: value };
    setItems(copy);
  };

  const handleSubmit = async () => {
    setMessage("");
    try {
      await apiFetch("/transactions", {
        method: "POST",
        body: JSON.stringify({
          type,
          items: items.map((i) => ({
            productId: Number(i.productId),
            quantity: Number(i.quantity),
          })),
        }),
      });
      setMessage("Transaction created successfully");
    } catch (err: any) {
      setMessage(err.message || "Failed to create transaction");
    }
  };

  return (
    <div>
      <h1>Create Transaction</h1>

      <div style={{ marginTop: 16 }}>
        <label>Type: </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "IN" | "OUT")}
        >
          <option value="IN">Stock In</option>
          <option value="OUT">Stock Out</option>
        </select>
      </div>

      <h3 style={{ marginTop: 16 }}>Items</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Current Stock</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, idx) => (
            <tr key={idx}>
              <td>
                <select
                  value={row.productId}
                  onChange={(e) =>
                    handleChangeRow(idx, "productId", Number(e.target.value))
                  }
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>{products.find((p) => p.id === row.productId)?.stock}</td>
              <td>
                <input
                  type="number"
                  value={row.quantity}
                  min={1}
                  onChange={(e) =>
                    handleChangeRow(idx, "quantity", Number(e.target.value))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button style={{ marginTop: 12 }} onClick={handleAddRow}>
        Add Product
      </button>

      <div style={{ marginTop: 16 }}>
        <button onClick={handleSubmit}>Save Transaction</button>
      </div>

      {message && <p style={{ marginTop: 8, color: "green" }}>{message}</p>}
    </div>
  );
}
