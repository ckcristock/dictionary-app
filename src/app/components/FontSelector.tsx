// src/app/components/FontSelector.tsx
"use client";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setFont } from "../store/fontSlice";

const fonts = [
  { value: "sans", label: "Sans Serif" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Monospace" },
];

export default function FontSelector() {
  const dispatch = useAppDispatch();
  const currentFont = useAppSelector((state) => state.font);

  return (
    <select
      value={currentFont}
      onChange={(e) => dispatch(setFont(e.target.value as any))}
      className="bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-md px-2 py-1 text-sm"
    >
      {fonts.map((f) => (
        <option
          key={f.value}
          value={f.value}
          className="bg-white text-black dark:bg-black dark:text-white"
        >
          {f.label}
        </option>
      ))}
    </select>
  );
}
