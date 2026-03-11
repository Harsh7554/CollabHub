import React from 'react';

export default function TransactionsPage() {
  // Expanded mock data with Indian Rupees (₹) and more context
  const transactions = [
    { id: 'TX-1005', entity: 'Brand Campaign A', type: 'Deposit', date: '2026-03-08', amount: '+₹45,000', status: 'Completed' },
    { id: 'TX-1004', entity: 'Alice Smith', type: 'Payout', date: '2026-03-07', amount: '-₹12,500', status: 'Completed' },
    { id: 'TX-1003', entity: 'Tech Solutions', type: 'Refund', date: '2026-03-05', amount: '+₹5,000', status: 'Pending' },
    { id: 'TX-1002', entity: 'Server Hosting', type: 'Expense', date: '2026-03-04', amount: '-₹2,500', status: 'Failed' },
    { id: 'TX-1001', entity: 'Bob Jones', type: 'Payout', date: '2026-03-01', amount: '-₹8,000', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-950">Transactions</h1>
          <p className="text-slate-500 mt-1">Monitor incoming revenue and outgoing payouts.</p>
        </div>
        <button className="bg-teal-500 text-white px-5 py-2.5 rounded-lg hover:bg-teal-600 font-medium shadow-sm transition-colors whitespace-nowrap">
          Download Statement
        </button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-medium">Total Inflow (30d)</h3>
          <p className="text-2xl font-bold mt-2 text-teal-600">+₹1,24,500</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-medium">Total Outflow (30d)</h3>
          <p className="text-2xl font-bold mt-2 text-rose-500">-₹42,300</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-medium">Pending Clearances</h3>
          <p className="text-2xl font-bold mt-2 text-indigo-900">₹15,000</p>
        </div>
      </div>

      {/* Toolbar: Search and Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <input 
          type="text" 
          placeholder="Search by ID or Entity..." 
          className="w-full sm:w-80 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm"
        />
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <select className="bg-slate-50 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer text-sm w-full sm:w-auto">
            <option>All Types</option>
            <option>Deposit</option>
            <option>Payout</option>
            <option>Refund</option>
          </select>
          <select className="bg-slate-50 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer text-sm w-full sm:w-auto">
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Transaction ID</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Entity / Type</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Date</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Amount</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-indigo-950 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
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
                    <button className="text-slate-400 hover:text-indigo-600 font-medium text-sm transition-colors underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}