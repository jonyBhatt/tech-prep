import Header from "@/components/shared/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <section
        className="pt-28 sm:pt-32 flex flex-1 min-h-dvh
      "
      >
        {children}
      </section>
      <p>Footer</p>
    </div>
  );
}
