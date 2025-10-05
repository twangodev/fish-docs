export const ColorSwatch = ({ hex, name }) => {
  return (
    <div>
      <div
        className="h-24 rounded-lg mb-2 flex items-end justify-start p-3"
        style={{ backgroundColor: hex }}
      >
        <code className="text-xs font-mono bg-white/90 dark:bg-black/90 px-2 py-1 rounded">
          {hex}
        </code>
      </div>
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
};