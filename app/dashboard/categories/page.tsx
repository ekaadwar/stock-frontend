"use client";

import { useEffect, useState, FormEvent } from "react";
import { apiFetch } from "@/lib/api";
import { Button } from "@/app/components/units/Button";
import { CategoryFormModalTemplate } from "@/app/components/templates/CategoryFormModalTemplate";
import { ConfirmDeleteModalTemplate } from "@/app/components/templates/ConfirmDeleteModalTemplate";

type Category = {
  id: number;
  name: string;
  description: string | null;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);

  // Load categories
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await apiFetch("/categories");
        setCategories(data);
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
    setSelectedCategory(null);
    setName("");
    setDescription("");
    setFormOpen(true);
  };

  const openEditModal = (category: Category) => {
    setFormMode("edit");
    setSelectedCategory(category);
    setName(category.name);
    setDescription(category.description ?? "");
    setFormOpen(true);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (formMode === "create") {
        const created = await apiFetch("/categories", {
          method: "POST",
          body: JSON.stringify({ name, description }),
        });
        setCategories((prev) => [...prev, created]);
      } else if (formMode === "edit" && selectedCategory) {
        const updated = await apiFetch(`/categories/${selectedCategory.id}`, {
          method: "PUT",
          body: JSON.stringify({ name, description }),
        });
        setCategories((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
      }
      setFormOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const openDeleteConfirm = (category: Category) => {
    setDeleteCategory(category);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteCategory) return;
    try {
      await apiFetch(`/categories/${deleteCategory.id}`, {
        method: "DELETE",
      });
      setCategories((prev) => prev.filter((c) => c.id !== deleteCategory.id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteOpen(false);
    }
  };

  return (
    <div className="h-full w-full bg-[#0A0A0A] text-[#F0F0F0]">
      {/* Top bar: Add Category */}
      <div className="flex justify-end px-8 pt-4 pb-3">
        <Button
          type="button"
          className="bg-[#666666] text-[#F0F0F0] hover:bg-[#777777]"
          onClick={openCreateModal}
        >
          Add Category
        </Button>
      </div>

      {/* Table */}
      <div className="px-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#666666] text-[#F0F0F0]">
              <th className="px-4 py-2 text-left font-normal">Name</th>
              <th className="px-4 py-2 text-left font-normal">Description</th>
              {/* kolom Action tidak punya label */}
              <th className="px-4 py-2 w-24" />
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr className="bg-[#0A0A0A] border-t border-[#666666]">
                <td className="px-4 py-3" colSpan={3}>
                  Loading...
                </td>
              </tr>
            )}

            {!loading &&
              categories.map((category) => (
                <tr
                  key={category.id}
                  className="bg-[#0A0A0A] border-t border-[#666666]"
                >
                  <td className="px-4 py-3 align-top">{category.name}</td>
                  <td className="px-4 py-3 align-top">
                    {category.description || "-"}
                  </td>
                  <td className="px-4 py-3 align-top text-right">
                    <button
                      type="button"
                      onClick={() => openEditModal(category)}
                      className="mr-3 text-xs text-orange-400 hover:text-orange-300"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteConfirm(category)}
                      className="text-xs text-red-500 hover:text-red-400"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}

            {!loading && categories.length === 0 && (
              <tr className="bg-[#0A0A0A] border-t border-[#666666]">
                <td className="px-4 py-3" colSpan={3}>
                  No categories yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create / Update modal */}
      <CategoryFormModalTemplate
        open={formOpen}
        mode={formMode}
        name={name}
        description={description}
        onNameChange={setName}
        onDescriptionChange={setDescription}
        onCancel={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Delete confirm modal */}
      <ConfirmDeleteModalTemplate
        open={deleteOpen}
        categoryName={deleteCategory?.name ?? ""}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
