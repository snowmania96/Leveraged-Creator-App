export function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-left pl-3 text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}
