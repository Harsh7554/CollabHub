import React from 'react';

export default function ReportsPage() {
  // Mock data for the detailed report table
  const reportData = [
    { id: 1, campaign: 'Summer Collab', clicks: '12,450', conversions: '840', revenue: '₹45,000', ROI: '+124%' },
    { id: 2, campaign: 'Winter Launch', clicks: '8,200', conversions: '410', revenue: '₹22,500', ROI: '+85%' },
    { id: 3, campaign: 'Spring Awareness', clicks: '15,000', conversions: '1,200', revenue: '₹85,000', ROI: '+210%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-950">Reports & Analytics</h1>
          <p className="text-slate-500 mt-1">Analyze platform growth and campaign performance.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Date Filter Placeholder */}
          <select className="bg-white border border-slate-300 text-slate-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer shadow-sm">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>
          
          {/* Export Button */}
          <button className="bg-teal-500 text-white px-5 py-2 rounded-lg hover:bg-teal-600 font-medium shadow-sm transition-colors flex items-center gap-2">
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-teal-500">
          <h3 className="text-slate-500 text-sm font-medium">Total Generated Revenue</h3>
          <p className="text-2xl font-bold mt-2 text-indigo-950">₹1,52,500</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-indigo-500">
          <h3 className="text-slate-500 text-sm font-medium">Total Conversions</h3>
          <p className="text-2xl font-bold mt-2 text-indigo-950">2,450</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-rose-400">
          <h3 className="text-slate-500 text-sm font-medium">Average ROI</h3>
          <p className="text-2xl font-bold mt-2 text-indigo-950">+139%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-indigo-950 font-semibold mb-4">Audience Growth</h3>
          <div className="flex-1 bg-slate-50 rounded-lg border border-dashed border-slate-300 flex items-center justify-center min-h-[250px]">
            <p className="text-slate-400 text-sm font-medium">
              [ Insert Line Chart - e.g., Recharts ]
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-indigo-950 font-semibold mb-4">Revenue by Campaign</h3>
          <div className="flex-1 bg-slate-50 rounded-lg border border-dashed border-slate-300 flex items-center justify-center min-h-[250px]">
            <p className="text-slate-400 text-sm font-medium">
              [ Insert Bar Chart - e.g., Recharts ]
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-indigo-950 font-semibold">Campaign Performance Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Campaign</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Clicks</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Conversions</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Revenue</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-800">{row.campaign}</td>
                  <td className="py-4 px-6 text-slate-600">{row.clicks}</td>
                  <td className="py-4 px-6 text-slate-600">{row.conversions}</td>
                  <td className="py-4 px-6 font-medium text-indigo-900">{row.revenue}</td>
                  <td className="py-4 px-6 font-medium text-teal-600">{row.ROI}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}