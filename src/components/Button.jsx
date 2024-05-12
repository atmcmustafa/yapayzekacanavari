const Button = ({ children, className, ...props }) => {
  return (
    <a {...props} className={`text-base sm:text-sm btn ${className}`}>
      {children}
    </a>
  );
};

export default Button;
