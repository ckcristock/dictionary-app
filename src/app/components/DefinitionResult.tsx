"use client";

export default function DefinitionResult() {
  return (
    <section className="mt-8 px-4">
      {/* Aquí se mostrará la palabra, fonética, significado y audio */}
      <div
        className="text-center text-neutral-500 italic select-none"
        tabIndex={0}
        aria-live="polite"
      >
        No word searched yet.
      </div>
    </section>
  );
}
