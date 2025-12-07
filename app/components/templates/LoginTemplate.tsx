"use client";

import { FormEvent } from "react";
import { Card } from "../blocks/Card";
import { TextInput } from "../units/Input";
import { Button } from "../units/Button";

type LoginTemplateProps = {
  email: string;
  password: string;
  error?: string;
  loading?: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function LoginTemplate({
  email,
  password,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginTemplateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <Card title="Login">
        <form onSubmit={onSubmit} className="space-y-4">
          <TextInput
            label="Username"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="input text"
          />

          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="input text long"
          />

          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
