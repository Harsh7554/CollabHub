"use client"; // Required for Next.js app router to use state and interactivity

import React, { useState, useMemo } from 'react';

export default function CampaignsPage() {
  // 1. Initial State (Mock Data)
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Summer Influencer Collab', status: 'Active', spent: 25000, budget: 50000, startDate: '2026-03-01' },
    { id: 2, name: 'Winter Product Launch', status: 'Draft', spent: 0, budget: 20000, startDate: '2026-11-15' },
    { id: 3, name: 'Spring Brand Awareness', status: 'Completed', spent: 75000, budget: 75000, startDate: '2026-01-10' },
    { id: 4, name: 'Diwali Mega Sale', status: 'Active', spent: 10000, budget: 100000, startDate: '2026-10-01' },
  ]);

  // 2. Control States for UI
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. Form State for New Campaign
  const [newCampaign, setNewCampaign] = useState({ name: '', budget: '', status: 'Draft' });

  // --- Functions --- //

  // Filter campaigns dynamically based on search and dropdown
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(camp => {
      const matchesSearch = camp.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || camp.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [campaigns, searchTerm, statusFilter]);

  // Handle Deleting a Campaign
  const handleDelete = (id) => {
    if(confirm("Are you sure you want to delete this campaign?")) {
      setCampaigns(campaigns.filter(camp => camp.id !== id));
    }
  };

  // Handle Creating a Campaign
  const handleCreate = (e) => {
    e.preventDefault();
    if (!newCampaign.name || !newCampaign.budget) return;

    const campaignToAdd = {
      id: campaigns.length + 1,
      name: newCampaign.name,
      status: newCampaign.status,
      spent: 0,
      budget: parseFloat(newCampaign.budget),
      startDate: new Date().toISOString().split('T')[0],
    };

    setCampaigns([campaignToAdd, ...campaigns]);
    setNewCampaign({ name: '', budget: '', status: 'Draft' }); // Reset form
    setIsModalOpen(false); // Close modal
  };

  // --- Render --- //
  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-950">Campaigns</h1>
          <p className="text-slate-500 mt-1">Manage, track, and create your marketing efforts.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-500 text-white px-5 py-2.5 rounded-lg hover:bg-teal-600 font-medium shadow-sm transition-all transform hover:scale-105"
        >
          + Create Campaign
        </button>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-indigo-500">
          <h3 className="text-slate-500 text-sm font-medium">Total Campaigns</h3>
          <p className="text-2xl font-bold mt-2 text-indigo-950">{campaigns.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-teal-500">
          <h3 className="text-slate-500 text-sm font-medium">Active Campaigns</h3>
          <p className="text-2xl font-bold mt-2 text-indigo-950">
            {campaigns.filter(c => c.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-rose-400">
          <h3 className="text-slate-500 text-sm font-medium">Total Budget Managed</h3>
          <p className="text-2xl font-bold mt-2 text-indigo-950">
            ₹{campaigns.reduce((sum, camp) => sum + camp.budget, 0).toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Toolbar: Search and Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <input 
          type="text" 
          placeholder="Search campaigns..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm"
        />
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto bg-slate-50 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer text-sm"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Draft">Draft</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Campaign Details</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Budget & Progress</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-slate-500">No campaigns found.</td>
                </tr>
              ) : (
                filteredCampaigns.map((camp) => {
                  const progressPercentage = camp.budget > 0 ? (camp.spent / camp.budget) * 100 : 0;
                  
                  return (
                    <tr key={camp.id} className="hover:bg-slate-50 transition-colors">
                      {/* Name & Date */}
                      <td className="py-4 px-6">
                        <p className="font-medium text-slate-900">{camp.name}</p>
                        <p className="text-xs text-slate-500 mt-1">Started: {camp.startDate}</p>
                      </td>
                      
                      {/* Status Badge */}
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border
                          ${camp.status === 'Active' ? 'bg-teal-50 text-teal-700 border-teal-200' : 
                            camp.status === 'Completed' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                            'bg-rose-50 text-rose-700 border-rose-200'}`}>
                          {camp.status}
                        </span>
                      </td>

                      {/* Budget Progress Bar */}
                      <td className="py-4 px-6">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">Spent: ₹{camp.spent.toLocaleString('en-IN')}</span>
                          <span className="font-medium text-slate-700">₹{camp.budget.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${progressPercentage >= 100 ? 'bg-rose-500' : 'bg-teal-500'}`}
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                          ></div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-4">
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors">Edit</button>
                        <button 
                          onClick={() => handleDelete(camp.id)}
                          className="text-rose-500 hover:text-rose-700 font-medium text-sm transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Modal Overlay for Creating Campaign --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-indigo-950">Create New Campaign</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Name</label>
                <input 
                  type="text" 
                  required
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  placeholder="e.g. Summer Festival Promo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Total Budget (₹)</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  placeholder="50000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Initial Status</label>
                <select 
                  value={newCampaign.status}
                  onChange={(e) => setNewCampaign({...newCampaign, status: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                >
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                </select>
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 shadow-sm transition-colors"
                >
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}