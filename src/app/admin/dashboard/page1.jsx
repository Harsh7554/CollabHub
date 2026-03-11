"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  // 1. State for the interactive time filter
  const [timeFilter, setTimeFilter] = useState('This Month');

  // 2. Dynamic Mock Data depending on the selected filter
  const dashboardData = {
    'This Week': {
      kpis: [
        { label: "Total Users", value: "145", trend: "+12%", isPositive: true, accent: "border-t-indigo-500" },
        { label: "Campaigns", value: "8", trend: "+2%", isPositive: true, accent: "border-t-teal-500" },
        { label: "Revenue", value: "₹45,000", trend: "+15%", isPositive: true, accent: "border-t-teal-500" },
        { label: "Active Campaigns", value: "12", trend: "0%", isPositive: true, accent: "border-t-slate-300" },
      ],
      chart: [
        { name: 'Mon', revenue: 5000 }, { name: 'Tue', revenue: 7000 }, { name: 'Wed', revenue: 4500 },
        { name: 'Thu', revenue: 9000 }, { name: 'Fri', revenue: 12000 }, { name: 'Sat', revenue: 5000 }, { name: 'Sun', revenue: 2500 }
      ]
    },
    'This Month': {
      kpis: [
        { label: "Total Users", value: "1,240", trend: "+18%", isPositive: true, accent: "border-t-indigo-500" },
        { label: "Campaigns", value: "45", trend: "+5%", isPositive: true, accent: "border-t-teal-500" },
        { label: "Revenue", value: "₹2,50,000", trend: "+22%", isPositive: true, accent: "border-t-teal-500" },
        { label: "Active Campaigns", value: "12", trend: "-2%", isPositive: false, accent: "border-t-rose-500" },
      ],
      chart: [
        { name: 'Week 1', revenue: 40000 }, { name: 'Week 2', revenue: 65000 },
        { name: 'Week 3', revenue: 85000 }, { name: 'Week 4', revenue: 60000 }
      ]
    },
    'This Year': {
      kpis: [
        { label: "Total Users", value: "14,500", trend: "+45%", isPositive: true, accent: "border-t-indigo-500" },
        { label: "Campaigns", value: "320", trend: "+15%", isPositive: true, accent: "border-t-teal-500" },
        { label: "Revenue", value: "₹34,50,000", trend: "+55%", isPositive: true, accent: "border-t-teal-500" },
        { label: "Active Campaigns", value: "28", trend: "+10%", isPositive: true, accent: "border-t-teal-500" },
      ],
      chart: [
        { name: 'Jan', revenue: 120000 }, { name: 'Feb', revenue: 150000 }, { name: 'Mar', revenue: 250000 },
        { name: 'Apr', revenue: 180000 }, { name: 'May', revenue: 300000 }, { name: 'Jun', revenue: 280000 }
      ]
    }
  };

  const currentData = dashboardData[timeFilter] || dashboardData['This Month'];

  // 3. Mock Data for Activity Timeline
  const activities = [
    { id: 1, type: 'user', title: "New user registered", desc: "Jane Doe joined as Influencer", time: "2 hours ago", icon: "👤", bg: "bg-indigo-100", textCol: "text-indigo-600" },
    { id: 2, type: 'campaign', title: "Campaign created", desc: "Nike launched 'Summer Active'", time: "4 hours ago", icon: "📢", bg: "bg-teal-100", textCol: "text-teal-600" },
    { id: 3, type: 'payment', title: "Payment received", desc: "₹10,000 credited from Brand XYZ", time: "Yesterday", icon: "₹", bg: "bg-emerald-100", textCol: "text-emerald-600" },
    { id: 4, type: 'user', title: "Influencer joined", desc: "Mike Smith completed onboarding", time: "2 days ago", icon: "👋", bg: "bg-indigo-100", textCol: "text-indigo-600" },
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Header with Interactive Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-950">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back! Here is a summary of your platform.</p>
        </div>
        <select 
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="bg-white border border-slate-300 text-slate-700 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer shadow-sm text-sm font-medium"
        >
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="This Year">This Year</option>
        </select>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentData.kpis.map((kpi, index) => (
          <div key={index} className={`bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 transition-all hover:shadow-md ${kpi.accent}`}>
            <p className="text-slate-500 text-sm font-medium">{kpi.label}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <h2 className="text-3xl font-bold text-indigo-950">{kpi.value}</h2>
              <span className={`text-sm font-semibold px-2 py-1 rounded-full ${kpi.isPositive ? 'bg-teal-50 text-teal-700' : 'bg-rose-50 text-rose-700'}`}>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid: Chart & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Analytics Chart Section (Takes up 2 columns on large screens) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-[420px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-indigo-950">Revenue Analytics ({timeFilter})</h2>
            <button className="text-teal-600 text-sm font-medium hover:text-teal-800 transition-colors">View Report</button>
          </div>
          
          {/* Interactive Recharts Bar Chart */}
          <div className="flex-1 w-full h-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData.chart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
                />
                {/* Using Electric Teal for the bars */}
                <Bar dataKey="revenue" fill="#14b8a6" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-[420px]">
          <h2 className="text-lg font-bold text-indigo-950 mb-6">Recent Activity</h2>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4 items-start">
                {/* Icon Container */}
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg mt-1 ${activity.bg} ${activity.textCol}`}>
                  {activity.icon}
                </div>
                {/* Activity Text */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">{activity.title}</h4>
                  <p className="text-sm text-slate-500 mt-0.5 leading-snug">{activity.desc}</p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 pt-4 text-sm text-indigo-600 font-medium border-t border-slate-100 hover:text-indigo-800 transition-colors">
            View All Activity
          </button>
        </div>

      </div>
    </div>
  );
}