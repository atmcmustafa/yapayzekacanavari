import Layer from "../components/Layer";
import HeaderIlkogretim from "../components/HeaderIlkogretim";

const Layout = ({ children }) => {
  return (
    <div>
      <Layer />
      <HeaderIlkogretim />
      {children}
    </div>
  );
};

export default Layout;
