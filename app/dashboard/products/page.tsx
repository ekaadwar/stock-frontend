"use client";

import { useEffect, useState, FormEvent } from "react";
import { apiFetch } from "@/lib/api";
import { Button } from "@/app/components/units/Button";
import { ProductFormModalTemplate } from "@/app/components/templates/ProductFormModalTemplate";
import { ConfirmDeleteModalTemplate } from "@/app/components/templates/ConfirmDeleteModalTemplate";

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  stock: number;
  description: string | null;
  categoryId: number;
  category?: Category;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // form state
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [name, setName] = useState("");
  const [stock, setStock] = useState("0");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  // delete state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  // load data
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [cats, prods] = await Promise.all([
          apiFetch("/categories"),
          apiFetch("/products"),
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const openCreateModal = () => {
    setFormMode("create");
    setSelectedProduct(null);
    setName("");
    setStock("0");
    setDescription("");
    setCategoryId(null);
    setFormOpen(true);
  };

  const openEditModal = (product: Product) => {
    setFormMode("edit");
    setSelectedProduct(product);
    setName(product.name);
    setStock(String(product.stock));
    setDescription(product.description ?? "");
    setCategoryId(product.categoryId);
    setFormOpen(true);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !categoryId) return;

    const payload = {
      name,
      stock: Number(stock),
      categoryId,
      description,
    };

    try {
      if (formMode === "create") {
        const created = await apiFetch("/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setProducts((prev) => [...prev, created]);
      } else if (formMode === "edit" && selectedProduct) {
        const updated = await apiFetch(`/products/${selectedProduct.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setProducts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
      }
      setFormOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const openDeleteConfirm = (product: Product) => {
    setDeleteProduct(product);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteProduct) return;
    try {
      await apiFetch(`/products/${deleteProduct.id}`, {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((p) => p.id !== deleteProduct.id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteOpen(false);
    }
  };

  return (
    <div className="h-full w-full bg-[#0A0A0A] text-[#F0F0F0]">
      {/* Top bar: Add Product */}
      <div className="flex justify-end px-8 pt-4 pb-3">
        <Button
          type="button"
          className="bg-[#666666] text-[#F0F0F0] hover:bg-[#777777]"
          onClick={openCreateModal}
        >
          Add Product
        </Button>
      </div>

      {/* Table */}
      <div className="px-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#666666] text-[#F0F0F0]">
              <th className="px-4 py-2 text-left font-normal">Name</th>
              <th className="px-4 py-2 text-left font-normal">Stock</th>
              <th className="px-4 py-2 text-left font-normal">Category</th>
              <th className="px-4 py-2 text-left font-normal">Description</th>
              {/* kolom action */}
              <th className="px-4 py-2 w-24" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr className="bg-[#0A0A0A] border-t border-[#666666]">
                <td className="px-4 py-3" colSpan={5}>
                  Loading...
                </td>
              </tr>
            )}

            {!loading &&
              products.map((product) => (
                <tr
                  key={product.id}
                  className="bg-[#0A0A0A] border-t border-[#666666]"
                >
                  <td className="px-4 py-3 align-top">{product.name}</td>
                  <td className="px-4 py-3 align-top">{product.stock}</td>
                  <td className="px-4 py-3 align-top">
                    {product.category?.name ??
                      categories.find((c) => c.id === product.categoryId)
                        ?.name ??
                      "-"}
                  </td>
                  <td className="px-4 py-3 align-top">
                    {product.description || "-"}
                  </td>
                  <td className="px-4 py-3 align-top text-right">
                    <button
                      type="button"
                      onClick={() => openEditModal(product)}
                      className="mr-3 text-xs text-orange-400 hover:text-orange-300"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteConfirm(product)}
                      className="text-xs text-red-500 hover:text-red-400"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}

            {!loading && products.length === 0 && (
              <tr className="bg-[#0A0A0A] border-t border-[#666666]">
                <td className="px-4 py-3" colSpan={5}>
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create / Update modal */}
      <ProductFormModalTemplate
        open={formOpen}
        mode={formMode}
        name={name}
        stock={stock}
        description={description}
        categoryId={categoryId}
        categories={categories}
        onNameChange={setName}
        onStockChange={setStock}
        onDescriptionChange={setDescription}
        onCategoryChange={setCategoryId}
        onCancel={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Delete confirm modal (pakai template yg sama dengan categories) */}
      <ConfirmDeleteModalTemplate
        open={deleteOpen}
        categoryName={deleteProduct?.name ?? ""}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
