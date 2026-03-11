export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Dashboard Overview
      </h1>
      

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border-t-4 border-blue-500">
    <p className="text-gray-500 text-sm">Total Users</p>
    <h2 className="text-3xl font-bold mt-2">120</h2>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border-t-4 border-green-500">
    <p className="text-gray-500 text-sm">Campaigns</p>
    <h2 className="text-3xl font-bold mt-2">45</h2>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border-t-4 border-purple-500">
    <p className="text-gray-500 text-sm">Revenue</p>
    <h2 className="text-3xl font-bold mt-2">₹2,50,000</h2>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border-t-4 border-orange-500">
    <p className="text-gray-500 text-sm">Active Campaigns</p>
    <h2 className="text-3xl font-bold mt-2">12</h2>
  </div>

</div>


<div className="mt-8 bg-white p-6 rounded-xl shadow-sm border">

<h2 className="text-lg font-semibold mb-6">
Revenue Analytics
</h2>

<div className="grid grid-cols-6 gap-4 items-end h-48">

<div className="bg-blue-400 h-20 rounded"></div>
<div className="bg-blue-400 h-28 rounded"></div>
<div className="bg-blue-400 h-36 rounded"></div>
<div className="bg-blue-400 h-24 rounded"></div>
<div className="bg-blue-400 h-40 rounded"></div>
<div className="bg-blue-400 h-32 rounded"></div>

</div>

<div className="flex justify-between text-xs text-gray-400 mt-3">
<span>Jan</span>
<span>Feb</span>
<span>Mar</span>
<span>Apr</span>
<span>May</span>
<span>Jun</span>
</div>

</div>

{/* Recent Activity */}
<div className="mt-10 bg-white p-6 rounded-xl shadow-sm">

  <h2 className="text-lg font-semibold mb-4">
    Recent Activity
  </h2>

  <ul className="space-y-3 text-sm text-gray-600">
    <li>✔ New user registered</li>
    <li>✔ Campaign created by Nike</li>
    <li>✔ Payment received ₹10,000</li>
    <li>✔ Influencer joined platform</li>
  </ul>

</div>


    </div>
  );
}