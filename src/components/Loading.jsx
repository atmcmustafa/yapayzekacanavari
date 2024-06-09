import Layer from "./Layer";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Layer />
      <div className="flex flex-col text-black items-center justify-center gap-4">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] "
          role="status"
        ></div>
        <div className="loader">Yükleniyor...</div>
      </div>
    </div>
  );
};

export default Loading;
