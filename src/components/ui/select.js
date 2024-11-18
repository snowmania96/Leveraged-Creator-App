export function Select({ name, value, onValueChange, children }) {
    return (
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {children}
        </select>
      </div>
    );
  }
  
  export function SelectTrigger({ id, children }) {
    return (
      <div className="relative">
        <select
          id={id}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {children}
        </select>
      </div>
    );
  }
  
  export function SelectValue({ placeholder }) {
    return (
      <span className="block text-gray-500">{placeholder}</span>
    );
  }
  
  export function SelectItem({ value, children }) {
    return (
      <option value={value} className="text-sm text-gray-700 hover:bg-gray-100">
        {children}
      </option>
    );
  }
  
  export function SelectContent({ children }) {
    return (
      <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
        {children}
      </div>
    );
  }
  