export function Alerts() {
  return (
    <div className="flex-1 p-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-4">Alerts</h1>
        <p className="text-[#9ca3af] mb-8">
          System notifications and alert management
        </p>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
          <p className="text-[#6b7280]">No active alerts</p>
        </div>
      </div>
    </div>
  );
}
