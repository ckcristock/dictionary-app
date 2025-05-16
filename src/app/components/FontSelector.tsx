"use client";

import { useState } from "react";

const fonts = ["sans", "serif", "mono"];

export default function FontSelector() {
  const [font, setFont] = useState("sans");

  return (
    <select
      value={font}
      onChange={(e) => setFont(e.target.value)}
      className="bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-md px-2 py-1 text-sm"
    >
      {fonts.map((f) => (
        <option
          key={f}
          value={f}
          className="bg-white text-black dark:bg-black dark:text-white"
        >
          {f}
        </option>
      ))}
    </select>
  );
}
