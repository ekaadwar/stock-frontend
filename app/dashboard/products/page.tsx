"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  stock: number;
  category: Category;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    stock: 0,
    categoryId: 0,
  });

  const load = async () => {
    const [prods, cats] = await Promise.all([
      apiFetch("/products"),
      apiFetch("/categories"),
    ]);
    setProducts(prods);
    setCategories(cats);
    if (cats.length && !form.categoryId) {
      setForm((f) => ({ ...f, categoryId: cats[0].id }));
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    await apiFetch("/products", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        stock: Number(form.stock),
        categoryId: Number(form.categoryId),
      }),
    });
    setForm({
      name: "",
      description: "",
      imageUrl: "",
      stock: 0,
      categoryId: categories[0]?.id || 0,
    });
    load();
  };

  const handleDelete = async (id: number) => {
    await apiFetch(`/products/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h1>Products</h1>

      <h3 style={{ marginTop: 24 }}>Create Product</h3>
      <div style={{ maxWidth: 500 }}>
        <input
          placeholder="Name"
          style={{ width: "100%", marginBottom: 8 }}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          style={{ width: "100%", marginBottom: 8 }}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Image URL"
          style={{ width: "100%", marginBottom: 8 }}
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          style={{ width: "100%", marginBottom: 8 }}
          value={form.stock}
          onChange={(e) =>
            setForm({
              ...form,
              stock: Number(e.target.value),
            })
          }
        />
        <select
          style={{ width: "100%", marginBottom: 8 }}
          value={form.categoryId}
          onChange={(e) =>
            setForm({
              ...form,
              categoryId: Number(e.target.value),
            })
          }
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button onClick={handleCreate}>Save</button>
      </div>

      <h3 style={{ marginTop: 32 }}>List Products</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Stok</th>
            <th>Kategori</th>
            <th>Gambar</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.stock}</td>
              <td>{p.category?.name}</td>
              <td>
                {p.imageUrl && <img src={p.imageUrl} alt={p.name} width={60} />}
              </td>
              <td>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
