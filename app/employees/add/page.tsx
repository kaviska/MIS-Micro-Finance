"use client";
import { useState } from "react";
import ToastMessage from "@/app/components/ToastMessage";
import { AlertColor } from "@mui/material";

interface EmployeeFormData {
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  hire_date: string;
  branch_id: string;
  status: string;
  address: string;
  emergency_contact: string;
  notes: string;
}

export default function AddEmployee() {
  const [formData, setFormData] = useState<EmployeeFormData>(() => ({
    employee_id: `EMP-${Date.now()}`,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    salary: 0,
    hire_date: new Date().toISOString().split('T')[0],
    branch_id: "",
    status: "active",
    address: "",
    emergency_contact: "",
    notes: "",
  }));

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const positions = [
    "Manager",
    "Loan Officer",
    "Customer Service Representative",
    "Accountant",
    "Credit Analyst",
    "Teller",
    "IT Specialist",
    "HR Coordinator",
    "Compliance Officer",
    "Field Agent"
  ];

  const departments = [
    "Lending",
    "Customer Service",
    "Finance",
    "IT",
    "Human Resources",
    "Compliance",
    "Operations",
    "Marketing"
  ];

  const branches = [
    { value: "BR-001", label: "Main Branch - Downtown" },
    { value: "BR-002", label: "North Branch" },
    { value: "BR-003", label: "South Branch" },
    { value: "BR-004", label: "East Branch" },
    { value: "BR-005", label: "West Branch" }
  ];

  const handleSubmit = async () => {
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.position) {
      setToast({
        open: true,
        message: "Please fill all required fields",
        severity: "error",
      });
      return;
    }

    try {
      setToast({
        open: true,
        message: "Adding employee...",
        severity: "info",
      });

      await new Promise(resolve => setTimeout(resolve, 1500));

      setToast({
        open: true,
        message: "Employee added successfully!",
        severity: "success",
      });

      // Reset form
      setFormData({
        employee_id: `EMP-${Date.now()}`,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        salary: 0,
        hire_date: new Date().toISOString().split('T')[0],
        branch_id: "",
        status: "active",
        address: "",
        emergency_contact: "",
        notes: "",
      });
    } catch {
      setToast({
        open: true,
        message: "An error occurred while adding the employee",
        severity: "error",
      });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Employee</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Employees</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Add Employee</span>
        </nav>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Employee ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
            <input
              type="text"
              name="employee_id"
              value={formData.employee_id}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              disabled
            />
          </div>

          {/* Basic Information */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={(e) => setFormData({...formData, first_name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={(e) => setFormData({...formData, last_name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Position <span className="text-red-500">*</span></label>
            <select
              name="position"
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175]"
            >
              <option value="">Select Position</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175]"
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary ($)</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={(e) => setFormData({...formData, salary: Number(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175]"
              min="0"
              step="0.01"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
            <input
              type="date"
              name="hire_date"
              value={formData.hire_date}
              onChange={(e) => setFormData({...formData, hire_date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
            <select
              name="branch_id"
              value={formData.branch_id}
              onChange={(e) => setFormData({...formData, branch_id: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175]"
            >
              <option value="">Select Branch</option>
              {branches.map(branch => (
                <option key={branch.value} value={branch.value}>{branch.label}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on-leave">On Leave</option>
            </select>
          </div>

          <div className="mb-4 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175]"
              rows={3}
            />
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button
            className="px-6 py-3 rounded-md w-full bg-[#53B175] text-white hover:bg-[#449d63] transition-colors font-medium"
            onClick={handleSubmit}
          >
            Add Employee
          </button>
          <button
            className="px-6 py-3 rounded-md w-full bg-gray-500 text-white hover:bg-gray-600 transition-colors font-medium"
            onClick={() => window.location.href = '/employees/list'}
          >
            View All Employees
          </button>
        </div>
      </div>

      <ToastMessage
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
      />
    </div>
  );
}