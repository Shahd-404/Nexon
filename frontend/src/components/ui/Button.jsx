export default function Button({ children, className="", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-xl2 border border-ink hover:bg-ink hover:text-paper transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
