"use client";

import { Input } from "@/components/ui/input";

interface CustomRoleInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function CustomRoleInput({ value, onChange, placeholder }: CustomRoleInputProps) {
  return (
    <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-xl border-gray-200 text-base"
        autoFocus
      />
    </div>
  );
}
