export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="flex flex-col h-screen overflow-hidden">
        {children}
      </section>
    );
  }