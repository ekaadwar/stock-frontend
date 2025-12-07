"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Category = {
  id: number;
  name: string;
  description?: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const load = async () => {
    const data = await apiFetch("/categories");
    setCategories(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    await apiFetch("/categories", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    });
    setName("");
    setDescription("");
    load();
  };

  const handleDelete = async (id: number) => {
    await apiFetch(`/categories/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h1>Categories</h1>

      <h3 style={{ marginTop: 24 }}>Create Category</h3>
      <div style={{ maxWidth: 400 }}>
        <input
          placeholder="Name"
          style={{ width: "100%", marginBottom: 8 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          style={{ width: "100%", marginBottom: 8 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleCreate}>Save</button>
      </div>

      <h3 style={{ marginTop: 32 }}>List Categories</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
