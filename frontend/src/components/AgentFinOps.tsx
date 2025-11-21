export function AgentFinOps() {
  return (
    <div className="flex-1 p-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-4">AgentFinOps</h1>
        <p className="text-[#9ca3af] mb-8">
          Cost management and financial operations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">Monthly Cost</h3>
            <p className="text-[#FF9900] text-3xl font-bold">$12,450</p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">Budget</h3>
            <p className="text-[#00C896] text-3xl font-bold">$15,000</p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">Savings</h3>
            <p className="text-[#00C896] text-3xl font-bold">18%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
