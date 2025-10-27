"use client";
import { useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useMediaQuery } from '@mui/material';

// Sample data for loan dashboard
const loanStatusData = [
  { id: 0, value: 245, label: 'Active Loans', color: '#53B175' },
  { id: 1, value: 89, label: 'Pending Approval', color: '#FFA726' },
  { id: 2, value: 45, label: 'Overdue', color: '#F44336' },
  { id: 3, value: 156, label: 'Completed', color: '#2196F3' },
  { id: 4, value: 23, label: 'Rejected', color: '#9E9E9E' },
];

const monthlyLoanData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  loansIssued: [45, 52, 48, 67, 73, 81, 78, 95, 88, 102, 97, 89],
  loanAmount: [450000, 520000, 480000, 670000, 730000, 810000, 780000, 950000, 880000, 1020000, 970000, 890000],
};

const loanTypeData = [
  { id: 0, value: 180, label: 'Personal Loans', color: '#1976D2' },
  { id: 1, value: 125, label: 'Business Loans', color: '#53B175' },
  { id: 2, value: 95, label: 'Home Loans', color: '#FF9800' },
  { id: 3, value: 67, label: 'Auto Loans', color: '#9C27B0' },
  { id: 4, value: 45, label: 'Education Loans', color: '#00BCD4' },
];

const riskAnalysisData = {
  categories: ['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk'],
  currentMonth: [120, 80, 45, 12],
  previousMonth: [115, 75, 38, 15],
};

export default function LoanDashboard() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  
  const statistics = [
    {
      title: "Total Portfolio Value",
      value: "$12.5M",
      change: "+8.5%",
      changeType: "positive",
      icon: "💰",
    },
    {
      title: "Active Loans",
      value: "1,247",
      change: "+12.3%",
      changeType: "positive",
      icon: "📊",
    },
    {
      title: "Default Rate",
      value: "2.8%",
      change: "-0.5%",
      changeType: "positive",
      icon: "⚠️",
    },
    {
      title: "Monthly Revenue",
      value: "$285K",
      change: "+15.2%",
      changeType: "positive",
      icon: "📈",
    },
    {
      title: "Pending Applications",
      value: "89",
      change: "+23",
      changeType: "neutral",
      icon: "⏳",
    },
    {
      title: "Avg Loan Amount",
      value: "$45,300",
      change: "+2.1%",
      changeType: "positive",
      icon: "💵",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Loan Dashboard</h1>
        <p className="text-gray-600">Overview of loan portfolio and performance metrics</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {statistics.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="text-2xl">{stat.icon}</div>
              <div className={`text-sm px-2 py-1 rounded ${
                stat.changeType === 'positive' ? 'bg-green-100 text-green-600' :
                stat.changeType === 'negative' ? 'bg-red-100 text-red-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Loan Status Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Loan Status Distribution</h3>
          <div className="flex justify-center">
            <PieChart
              series={[
                {
                  data: loanStatusData,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  innerRadius: 40,
                  outerRadius: 120,
                },
              ]}
              width={isSmallScreen ? 300 : 400}
              height={300}
              slotProps={{
                legend: {
                  direction: 'row',
                  position: { vertical: 'bottom', horizontal: 'center' },
                },
              }}
            />
          </div>
        </div>

        {/* Loan Types Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Loan Types Distribution</h3>
          <div className="flex justify-center">
            <PieChart
              series={[
                {
                  data: loanTypeData,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  innerRadius: 40,
                  outerRadius: 120,
                },
              ]}
              width={isSmallScreen ? 300 : 400}
              height={300}
              slotProps={{
                legend: {
                  direction: 'row',
                  position: { vertical: 'bottom', horizontal: 'center' },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Monthly Performance Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Monthly Loans Issued */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Loans Issued</h3>
          <BarChart
            width={isSmallScreen ? 300 : 500}
            height={300}
            series={[
              {
                data: monthlyLoanData.loansIssued,
                label: 'Loans Issued',
                color: '#53B175',
              },
            ]}
            xAxis={[{ data: monthlyLoanData.months, scaleType: 'band' }]}
          />
        </div>

        {/* Risk Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Risk Analysis</h3>
          <BarChart
            width={isSmallScreen ? 300 : 500}
            height={300}
            series={[
              {
                data: riskAnalysisData.currentMonth,
                label: 'Current Month',
                color: '#1565C0',
              },
              {
                data: riskAnalysisData.previousMonth,
                label: 'Previous Month',
                color: '#FFA726',
              },
            ]}
            xAxis={[{ data: riskAnalysisData.categories, scaleType: 'band' }]}
          />
        </div>
      </div>

      {/* Loan Amount Trends */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Loan Amount Trends</h3>
        <div className="overflow-x-auto">
          <LineChart
            width={isSmallScreen ? 300 : 900}
            height={350}
            series={[
              {
                data: monthlyLoanData.loanAmount,
                label: 'Loan Amount ($)',
                color: '#53B175',
              },
              {
                data: monthlyLoanData.loansIssued.map(x => x * 10000), // Scale for comparison
                label: 'Number of Loans (x10k)',
                color: '#1565C0',
              },
            ]}
            xAxis={[{ 
              scaleType: 'point', 
              data: monthlyLoanData.months,
            }]}
          />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Loan Applications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Loan Applications</h3>
          <div className="space-y-4">
            {[
              { name: 'John Smith', amount: '$25,000', type: 'Personal', status: 'Pending', time: '2 hours ago' },
              { name: 'Sarah Johnson', amount: '$150,000', type: 'Business', status: 'Approved', time: '4 hours ago' },
              { name: 'Mike Brown', amount: '$35,000', type: 'Auto', status: 'Under Review', time: '6 hours ago' },
              { name: 'Emma Wilson', amount: '$80,000', type: 'Home', status: 'Approved', time: '1 day ago' },
              { name: 'David Lee', amount: '$15,000', type: 'Education', status: 'Pending', time: '2 days ago' },
            ].map((application, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{application.name}</div>
                  <div className="text-sm text-gray-600">{application.amount} • {application.type}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm px-2 py-1 rounded ${
                    application.status === 'Approved' ? 'bg-green-100 text-green-600' :
                    application.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {application.status}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{application.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            {[
              { metric: 'Approval Rate', value: '78.5%', trend: '+2.3%', color: 'green' },
              { metric: 'Average Processing Time', value: '3.2 days', trend: '-0.5 days', color: 'green' },
              { metric: 'Customer Satisfaction', value: '4.7/5.0', trend: '+0.2', color: 'green' },
              { metric: 'Default Recovery Rate', value: '85.2%', trend: '+1.8%', color: 'green' },
              { metric: 'Cost per Acquisition', value: '$125', trend: '-$15', color: 'green' },
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-blue-50">
                <div>
                  <div className="font-medium text-gray-900">{metric.metric}</div>
                  <div className="text-lg font-bold text-blue-600">{metric.value}</div>
                </div>
                <div className={`text-sm px-2 py-1 rounded ${
                  metric.color === 'green' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {metric.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
