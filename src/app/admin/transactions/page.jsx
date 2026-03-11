"use client";

import React, { useState, useMemo } from 'react';

export default function TransactionsPage() {
  // 1. Expanded Mock Data setup for state
  const [transactions] = useState([
    { id: 'TX-1008', entity: 'Brand Campaign B', type: 'Deposit', date: '2026-03-12', amount: '+₹85,000', status: 'Pending', desc: 'Initial deposit for Spring Launch campaign.' },
    { id: 'TX-1007', entity: 'Mike Johnson', type: 'Payout', date: '2026-03-10', amount: '-₹18,000', status: 'Completed', desc: 'Payment for Instagram reel deliverables.' },
    { id: 'TX-1006', entity: 'Stripe Processing', type: 'Expense', date: '2026-03-09', amount: '-₹1,250', status: 'Completed', desc: 'Monthly gateway processing fees.' },
    { id: 'TX-1005', entity: 'Brand Campaign A', type: 'Deposit', date: '2026-03-08', amount: '+₹45,000', status: 'Completed', desc: 'Final milestone payment.' },
    { id: 'TX-1004', entity: 'Alice Smith', type: 'Payout', date: '2026-03-07', amount: '-₹12,500', status: 'Completed', desc: 'Payment for 2x TikTok videos.' },
    { id: 'TX-1003', entity: 'Tech Solutions', type: 'Refund', date: '2026-03-05', amount: '+₹5,000', status: 'Pending', desc: 'Refund for overcharged server time.' },
    { id: 'TX-1002', entity: 'Server Hosting', type: 'Expense', date: '2026-03-04', amount: '-₹2,500', status: 'Failed', desc: 'AWS monthly hosting charge.' },
    { id: 'TX-1001', entity: 'Bob Jones', type: 'Payout', date: '2026-03-01', amount: '-₹8,000', status: 'Completed', desc: 'Payment for YouTube integration.' },
  ]);

  // 2. State for UI Controls
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTx, setSelectedTx] = useState(null); // Used for the Receipt Modal

  // 3. Logic: Filtering
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = tx.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tx.entity.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All' || tx.type === typeFilter;
      const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [transactions, searchTerm, typeFilter, statusFilter]);

  // 4. Logic: Calculate Summaries dynamically (Optional, but makes the dashboard real)
  const calcTotals = () => {
    let inflow = 0;
    let outflow = 0;
    let pending = 0;

    transactions.forEach(tx => {
      // Clean string to number
      const numAmount = parseInt(tx.amount.replace(/[^0-9]/g, ''), 10);
      
      if (tx.status === 'Pending') {
        pending += numAmount;
      } else if (tx.status === 'Completed') {
        if (tx.amount.startsWith('+')) inflow += numAmount;
        if (tx.amount.startsWith('-')) outflow += numAmount;
      }
    });

    return { inflow, outflow, pending };
  };

  const totals = calcTotals();

  return (
    <div className="space-y-6 relative">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-950">Transactions</h1>
          <p className="text-slate-500 mt-1">Monitor incoming revenue and outgoing payouts.</p>
        </div>
        <button 
          className="bg-teal-500 text-white px-5 py-2.5 rounded-lg hover:bg-teal-600 font-medium shadow-sm transition-colors whitespace-nowrap flex items-center gap-2"
          onClick={() => alert("Downloading CSV statement...")}
        >
          <span>📥</span> Download Statement
        </button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-teal-500">
          <h3 className="text-slate-500 text-sm font-medium">Total Inflow (Completed)</h3>
          <p className="text-2xl font-bold mt-2 text-teal-600">+₹{totals.inflow.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-slate-700">
          <h3 className="text-slate-500 text-sm font-medium">Total Outflow (Completed)</h3>
          <p className="text-2xl font-bold mt-2 text-slate-700">-₹{totals.outflow.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-indigo-500">
          <h3 className="text-slate-500 text-sm font-medium">Pending Clearances</h3>
          <p className="text-2xl font-bold mt-2 text-indigo-900">₹{totals.pending.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Toolbar: Search and Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <input 
          type="text" 
          placeholder="Search by TX ID or Entity..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all text-sm"
        />
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="flex-1 sm:flex-none bg-slate-50 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer text-sm"
          >
            <option value="All">All Types</option>
            <option value="Deposit">Deposit</option>
            <option value="Payout">Payout</option>
            <option value="Refund">Refund</option>
            <option value="Expense">Expense</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 sm:flex-none bg-slate-50 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Transaction ID</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Entity / Type</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Date</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Amount</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">No transactions match your search.</td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-indigo-600">{tx.id}</td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-slate-900">{tx.entity}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{tx.type}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-500">{tx.date}</td>
                    <td className={`py-4 px-6 font-bold ${tx.amount.startsWith('+') ? 'text-teal-600' : 'text-slate-700'}`}>
                      {tx.amount}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                        ${tx.status === 'Completed' ? 'bg-teal-50 text-teal-700 border-teal-200' : 
                          tx.status === 'Pending' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 
                          'bg-rose-50 text-rose-700 border-rose-200'}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => setSelectedTx(tx)}
                        className="text-slate-500 hover:text-indigo-600 font-medium text-sm transition-colors border border-slate-200 hover:border-indigo-200 px-3 py-1.5 rounded-md bg-white hover:bg-indigo-50"
                      >
                        View Receipt
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- View Receipt Modal --- */}
      {selectedTx && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all">
            
            {/* Modal Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-indigo-950">Receipt Details</h3>
              <button onClick={() => setSelectedTx(null)} className="text-slate-400 hover:text-slate-600 text-xl">&times;</button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="text-center pb-4 border-b border-slate-100">
                <p className="text-sm text-slate-500 mb-1">Amount</p>
                <p className={`text-4xl font-bold ${selectedTx.amount.startsWith('+') ? 'text-teal-600' : 'text-slate-800'}`}>
                  {selectedTx.amount}
                </p>
                <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium border
                  ${selectedTx.status === 'Completed' ? 'bg-teal-50 text-teal-700 border-teal-200' : 
                    selectedTx.status === 'Pending' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 
                    'bg-rose-50 text-rose-700 border-rose-200'}`}>
                  {selectedTx.status}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-medium text-indigo-950">{selectedTx.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date:</span>
                  <span className="font-medium text-indigo-950">{selectedTx.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Billed To/From:</span>
                  <span className="font-medium text-indigo-950">{selectedTx.entity}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-3 mt-3">
                  <span className="text-slate-500">Type:</span>
                  <span className="font-medium text-indigo-950">{selectedTx.type}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2">
                  <span className="text-slate-500 block mb-1 text-xs">Description:</span>
                  <span className="text-slate-700">{selectedTx.desc}</span>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setSelectedTx(null)}
                className="bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors w-full sm:w-auto"
              >
                Close Receipt
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}