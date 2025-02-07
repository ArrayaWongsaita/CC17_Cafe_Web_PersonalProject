export default function Input({
  placeholder,
  type = "text",
  error,
  onChange,
  value,
  name,
}) {
  return (
    <div className="relative flex flex-col">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 
    ${
      error
        ? "border-red-500 focus:ring-red-300"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-300"
    }`}
        placeholder={placeholder}
      />
      {error ? (
        <small className="text-red-500 absolute -bottom-6 ">{error}</small>
      ) : null}
    </div>
  );
}
