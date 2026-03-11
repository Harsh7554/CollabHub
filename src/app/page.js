import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to CollabHub</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        Your central hub for managing campaigns, transactions, and reports.
      </p>
      <Link 
        href="/admin/dashboard" 
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go to Admin Panel
      </Link>
    </div>
  );
}