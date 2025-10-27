"use client";
import { useState } from "react";
import ToastMessage from "@/app/components/ToastMessage";
import { AlertColor } from "@mui/material";

export default function ReportsOverview() {
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Sample data for demonstration
  const reportData = {
    totalCustomers: 156,
    activeLoans: 89,
    totalLoanAmount: 2450000,
    repaymentRate: 94.5,
    defaultRate: 2.1,
    averageLoanSize: 27528,
    portfolioGrowth: 12.8,
    branchPerformance: [
      { name: "Main Branch", loans: 35, amount: 980000, performance: 96.2 },
      { name: "North Branch", loans: 22, amount: 650000, performance: 92.8 },
      { name: "South Branch", loans: 18, amount: 480000, performance: 98.1 },
      { name: "East Branch", loans: 14, amount: 340000, performance: 89.5 },
    ],
    monthlyTrends: [
      { month: "Jan", loans: 15, amount: 420000 },
      { month: "Feb", loans: 18, amount: 510000 },
      { month: "Mar", loans: 22, amount: 630000 },
      { month: "Apr", loans: 19, amount: 540000 },
      { month: "May", loans: 25, amount: 720000 },
      { month: "Jun", loans: 28, amount: 810000 },
    ]
  };

  const generateReport = (reportType: string) => {
    setToast({
      open: true,
      message: `${reportType} report generation will be implemented soon`,
      severity: "info",
    });
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports Overview</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Reports</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Overview</span>
        </nav>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Customers</h3>
          <p className="text-3xl font-bold text-blue-600">{reportData.totalCustomers}</p>
          <p className="text-sm text-green-600 mt-2">↗ +8% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Loans</h3>
          <p className="text-3xl font-bold text-green-600">{reportData.activeLoans}</p>
          <p className="text-sm text-green-600 mt-2">↗ +12% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Portfolio</h3>
          <p className="text-3xl font-bold text-purple-600">${reportData.totalLoanAmount.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-2">↗ +{reportData.portfolioGrowth}% growth</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Repayment Rate</h3>
          <p className="text-3xl font-bold text-green-600">{reportData.repaymentRate}%</p>
          <p className="text-sm text-green-600 mt-2">↗ +1.2% from last month</p>
        </div>
      </div>

      {/* Quick Reports Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Reports</h3>
          <div className="space-y-3">
            <button
              onClick={() => generateReport("Customer Analysis")}
              className="w-full text-left p-3 rounded-md border hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-gray-800">Customer Analysis Report</div>
              <div className="text-sm text-gray-600">Detailed customer demographics and behavior</div>
            </button>
            
            <button
              onClick={() => generateReport("Loan Portfolio")}
              className="w-full text-left p-3 rounded-md border hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-gray-800">Loan Portfolio Report</div>
              <div className="text-sm text-gray-600">Portfolio performance and risk analysis</div>
            </button>
            
            <button
              onClick={() => generateReport("Repayment Tracking")}
              className="w-full text-left p-3 rounded-md border hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-gray-800">Repayment Tracking Report</div>
              <div className="text-sm text-gray-600">Payment schedules and collection efficiency</div>
            </button>
            
            <button
              onClick={() => generateReport("Branch Performance")}
              className="w-full text-left p-3 rounded-md border hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-gray-800">Branch Performance Report</div>
              <div className="text-sm text-gray-600">Branch-wise operational metrics</div>
            </button>
          </div>
        </div>

        {/* Branch Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Branch Performance</h3>
          <div className="space-y-4">
            {reportData.branchPerformance.map((branch, index) => (
              <div key={index} className="border-b pb-3 last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-800">{branch.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    branch.performance > 95 ? 'bg-green-100 text-green-800' :
                    branch.performance > 90 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {branch.performance}%
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {branch.loans} active loans • ${branch.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Loan Trends</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 font-medium text-gray-700">Month</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">New Loans</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">Loan Amount</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">Avg. Loan Size</th>
              </tr>
            </thead>
            <tbody>
              {reportData.monthlyTrends.map((trend, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{trend.month}</td>
                  <td className="py-3 px-4">{trend.loans}</td>
                  <td className="py-3 px-4">${trend.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">${Math.round(trend.amount / trend.loans).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Default Rate</h3>
          <p className="text-2xl font-bold text-red-600">{reportData.defaultRate}%</p>
          <p className="text-sm text-green-600 mt-2">↓ -0.3% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Average Loan Size</h3>
          <p className="text-2xl font-bold text-blue-600">${reportData.averageLoanSize.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-2">↗ +5.2% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Portfolio Growth</h3>
          <p className="text-2xl font-bold text-green-600">{reportData.portfolioGrowth}%</p>
          <p className="text-sm text-gray-600 mt-2">Year-over-year growth</p>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastMessage
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
      />
    </div>
  );
}