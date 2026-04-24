export const EnvironmentIndicators = () => {
  const environments = [
    { name: "Development", color: "bg-purple-500" },
    { name: "Staging", color: "bg-blue-500" },
    { name: "Production", color: "bg-red-500" },
  ];

  return (
    <div className="flex gap-2 w-1/2">
      {environments.map((env) => (
        <div
          key={env.name}
          className="bg-gray-200 w-full flex items-center py-1 px-3 rounded-md gap-3"
        >
          <span
            className={`w-[15px] h-[15px] ${env.color} rounded-full`}
          ></span>
          <p>{env.name}</p>
        </div>
      ))}
    </div>
  );
};
