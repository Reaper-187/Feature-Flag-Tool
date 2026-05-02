export const EnvironmentIndicators = () => {
  const environments = [
    { name: "Development", color: "bg-purple-500" },
    { name: "Staging", color: "bg-blue-500" },
    { name: "Production", color: "bg-red-500" },
  ];

  return (
    <div className="flex gap-2 w-full md:w-1/2 md:ml-auto">
      {environments.map((env) => (
        <div
          key={env.name}
          className="bg-gray-200 flex-1 flex items-center py-1 px-3 rounded-md gap-2"
        >
          <span className={`w-3 h-3 shrink-0 ${env.color} rounded-full`} />
          <p className="text-sm truncate">{env.name}</p>
        </div>
      ))}
    </div>
  );
};
