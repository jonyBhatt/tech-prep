export const MainTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="bg-linear-to-br from-stone-50 via-stone-300 to-stone-500 bg-clip-text text-transparent">
      {children}
    </span>
  );
};

export const HeadTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="bg-linear-to-br from-purple-300 via-purple-400 to-purple-600 bg-clip-text text-transparent">
      {children}
    </span>
  );
};

export const SectionLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-semibold bg-linear-to-br from-purple-200 via-purple-300 to-purple-600 bg-clip-text text-transparent uppercase mb-4 tracking-[0.14em]">
      <span className="w-4 h-px bg-linear-to-bl from-purple-400 to-purple-500" />
      {children}
    </p>
  );
};
