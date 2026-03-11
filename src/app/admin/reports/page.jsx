"use client";

import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

export default function ReportsPage() {
  // 1. Interactive State
  const [timeFilter, setTimeFilter] = useState('Last 30 Days');

  // 2. Mock Data (Expanded for interactivity)
  const baseReportData = [
    { id: 1, campaign: 'Summer Collab', clicks: 12450, conversions: 840, revenue: 45000, cost: 20000 },
    { id: 2, campaign: 'Winter Launch', clicks: 8200, conversions: 410, revenue: 22500, cost: 12000 },
    { id: 3, campaign: 'Spring Awareness', clicks: 15000, conversions: 1200, revenue: 85000, cost: 27000 },
    { id: 4, campaign: 'Diwali Mega Sale', clicks: 22000, conversions: 2100, revenue: 120000, cost: 40000 },
  ];

  // Mock chart data that "changes" based on the filter to feel alive
  const audienceData = {
    'Last 7 Days': [
      { name: 'Mon', followers: 4000 }, { name: 'Tue', followers: 4200 }, { name: 'Wed', followers: 4500 },
      { name: 'Thu', followers: 4600 }, { name: 'Fri', followers: 5100 }, { name: 'Sat', followers: 5800 }, { name: 'Sun', followers: 6200 }
    ],
    'Last 30 Days': [
      { name: 'Week 1', followers: 12000 }, { name: 'Week 2', followers: 15000 }, 
      { name: 'Week 3', followers: 19500 }, { name: 'Week 4', followers: 24000 }
    ],
    'This Year': [
      { name: 'Q1', followers: 45000 }, { name: 'Q2', followers: 60000 }, 
      { name: 'Q3', followers: 85000 }, { name: 'Q4', followers: 110000 }
    ]
  };

  // 3. Derived Calculations
  const currentChartData = audienceData[timeFilter] || audienceData['Last 30 Days'];

  // Calculate dynamic table data with ROI
  const tableData = useMemo(() => {
    // In a real app, you'd filter data by date here. We'll just map the base data for the demo.
    return baseReportData.map(item => {
      const roi = (((item.revenue - item.cost) / item.cost) * 100).toFixed(1);
      return { ...item, roi: `+${roi}%` };
    });
  }, [timeFilter]);

  // Calculate top-level KPIs dynamically
  const totals = useMemo(() => {
    const rev = tableData.reduce((sum, item) => sum + item.revenue, 0);
    const conv = tableData.reduce((sum, item) => sum + item.conversions, 0);
    const totalCost = tableData.reduce((sum, item) => sum + item.cost, 0);
    const avgRoi = (((rev - totalCost) / totalCost) * 100).toFixed(1);
    
    return { rev, conv, avgRoi };
  }, [tableData]);

  // 4. Export to CSV Function
  const exportToCSV = () => {
    // 1. Create CSV headers
    const headers = ['Campaign Name', 'Clicks', 'Conversions', 'Revenue (INR)', 'ROI (%)'];
    
    // 2. Map data to CSV rows
    const rows = tableData.map(row => [
      row.campaign, 
      row.clicks, 
      row.conversions, 
      row.revenue, 
      row.roi.replace('+', '').replace('%', '')
    ]);

    // 3. Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    // 4. Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `collabhub_report_${timeFilter.replace(/\s+/g, '_').toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-950">Reports & Analytics</h1>
          <p className="text-slate-500 mt-1">Analyze platform growth and campaign performance.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Working Date Filter */}
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-white border border-slate-300 text-slate-700 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer shadow-sm text-sm"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
          
          {/* Working Export Button */}
          <button 
            onClick={exportToCSV}
            className="bg-teal-500 text-white px-5 py-2.5 rounded-lg hover:bg-teal-600 font-medium shadow-sm transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
          >
            <span>📥 Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-teal-500 transition-all hover:shadow-md">
          <h3 className="text-slate-500 text-sm font-medium">Total Generated Revenue</h3>
          <p className="text-2xl font-bold mt-2 text-indigo-950">₹{totals.rev.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-indigo-500 transition-all hover:shadow-md">
          <h3 className="text-slate-500 text-sm font-medium">Total Conversions</h3>
          <p className="text-2xl font-bold mt-2 text-indigo-950">{totals.conv.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-rose-400 transition-all hover:shadow-md">
          <h3 className="text-slate-500 text-sm font-medium">Average ROI</h3>
          <p className="text-2xl font-bold mt-2 text-indigo-950">+{totals.avgRoi}%</p>
        </div>
      </div>

      {/* Charts Section using Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-[350px]">
          <h3 className="text-indigo-950 font-semibold mb-6">Audience Growth ({timeFilter})</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }}
              />
              <Line type="monotone" dataKey="followers" stroke="#14b8a6" strokeWidth={3} dot={{ r: 4, fill: '#14b8a6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-[350px]">
          <h3 className="text-indigo-950 font-semibold mb-6">Revenue by Campaign</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tableData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="campaign" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-indigo-950 font-semibold">Campaign Performance Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Campaign</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950 text-right">Clicks</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950 text-right">Conversions</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950 text-right">Revenue</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950 text-right">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-800">{row.campaign}</td>
                  <td className="py-4 px-6 text-slate-600 text-right">{row.clicks.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-6 text-slate-600 text-right">{row.conversions.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-6 font-medium text-indigo-900 text-right">₹{row.revenue.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-6 font-medium text-teal-600 text-right">{row.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}