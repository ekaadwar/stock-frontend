"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type TransactionItem = {
  id: number;
  quantity: number;
  product: {
    name: string;
  };
};

type Transaction = {
  id: number;
  type: "IN" | "OUT";
  createdAt: string;
  items: TransactionItem[];
};

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const load = async () => {
    const data = await apiFetch("/transactions");
    setTransactions(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>Transaction History</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.type}</td>
              <td>{new Date(t.createdAt).toLocaleString()}</td>
              <td>
                {t.items.map((i) => (
                  <div key={i.id}>
                    {i.product.name} x {i.quantity}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
