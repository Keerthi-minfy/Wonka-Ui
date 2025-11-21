export function Security() {
  return (
    <div className="flex-1 p-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-4">Security & Compliance</h1>
        <p className="text-[#9ca3af] mb-8">
          Security settings and compliance monitoring
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-white font-semibold mb-2">Access Control</h3>
            <p className="text-[#9ca3af] text-sm">IAM policies and permissions</p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-white font-semibold mb-2">Audit Logs</h3>
            <p className="text-[#9ca3af] text-sm">Activity monitoring and compliance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
