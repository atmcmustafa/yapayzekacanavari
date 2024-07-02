import Layer from "../components/Layer";
import HeaderIlkogretim from "../components/HeaderIlkogretim";

const Layout = ({ children, className }) => {
  return (
    <div className={`${className}`}>
      <Layer />
      <HeaderIlkogretim />
      {children}
    </div>
  );
};

export default Layout;
