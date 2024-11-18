export function Button({ type, className, children, disabled }) {
  return (
    <button
      type={type}
      className={`w-full px-4 py-2 mt-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
