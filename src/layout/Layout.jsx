import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-center py-4 mt-auto">
        <p className="text-sm font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>
          🤖 Yapay Zeka Canavarı &copy; {new Date().getFullYear()} — Yapay zekayı öğrenmenin en eğlenceli yolu!
        </p>
      </footer>
    </div>
  );
};

export default Layout;
