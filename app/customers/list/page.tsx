"use client";
import DataTableMy from "@/app/components/DataTable";
import { useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { AlertColor } from "@mui/material";
import ToastMessage from "@/app/components/ToastMessage";

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  job: string;
  monthly_income: number;
  credit_status: string;
  marital_status: string;
  family_members_count: number;
  special_notes: string;
}

export default function ViewCustomers() {
  // Sample data for demonstration
  const sampleCustomers: Customer[] = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@email.com",
      phone: "1234567890",
      job: "Software Engineer",
      monthly_income: 5000,
      credit_status: "Good",
      marital_status: "Married",
      family_members_count: 3,
      special_notes: "Regular customer with excellent payment history"
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@email.com",
      phone: "0987654321",
      job: "Teacher",
      monthly_income: 3500,
      credit_status: "Excellent",
      marital_status: "Single",
      family_members_count: 1,
      special_notes: "New customer, looking for first loan"
    },
    {
      id: 3,
      first_name: "Michael",
      last_name: "Johnson",
      email: "michael.johnson@email.com",
      phone: "5555555555",
      job: "Business Owner",
      monthly_income: 8000,
      credit_status: "Fair",
      marital_status: "Married",
      family_members_count: 4,
      special_notes: "Has multiple income sources"
    },
    {
      id: 4,
      first_name: "Sarah",
      last_name: "Williams",
      email: "sarah.williams@email.com",
      phone: "7777777777",
      job: "Nurse",
      monthly_income: 4200,
      credit_status: "Good",
      marital_status: "Divorced",
      family_members_count: 2,
      special_notes: "Prefers online communication"
    },
    {
      id: 5,
      first_name: "David",
      last_name: "Brown",
      email: "david.brown@email.com",
      phone: "8888888888",
      job: "Mechanic",
      monthly_income: 3000,
      credit_status: "Poor",
      marital_status: "Single",
      family_members_count: 1,
      special_notes: "Requires additional documentation"
    }
  ];

  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const columns = [
    {
      name: "Full Name",
      selector: (row: Customer) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: Customer) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row: Customer) => row.phone,
      sortable: true,
    },
    {
      name: "Job",
      selector: (row: Customer) => row.job,
      sortable: true,
    },
    {
      name: "Monthly Income",
      selector: (row: Customer) => `$${row.monthly_income.toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Credit Status",
      selector: (row: Customer) => row.credit_status,
      sortable: true,
      cell: (row: Customer) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.credit_status === "Excellent"
              ? "bg-green-100 text-green-800"
              : row.credit_status === "Good"
              ? "bg-blue-100 text-blue-800"
              : row.credit_status === "Fair"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.credit_status}
        </span>
      ),
    },
    {
      name: "Marital Status",
      selector: (row: Customer) => row.marital_status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Customer) => (
        <div className="flex gap-2 cursor-pointer">
          <button
            className="cursor-pointer"
            onClick={() => handleUpdate(row)}
            title="Update Customer"
          >
            <UpdateIcon fontSize="small" color="primary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleView(row)}
            title="View Customer Details"
          >
            <RemoveRedEyeIcon fontSize="small" color="action" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleDelete(row)}
            title="Delete Customer"
          >
            <HighlightOffIcon fontSize="small" color="error" />
          </button>
        </div>
      ),
    },
  ];

  const handleUpdate = (customer: Customer) => {
    setToast({
      open: true,
      message: `Update functionality for ${customer.first_name} ${customer.last_name} will be implemented soon`,
      severity: "info",
    });
  };

  const handleView = (customer: Customer) => {
    setSelectedCustomer(customer);
    setToast({
      open: true,
      message: `Viewing details for ${customer.first_name} ${customer.last_name}`,
      severity: "info",
    });
    
    // You can implement a modal here to show full customer details
    console.log("Customer Details:", customer);
  };

  const handleDelete = (customer: Customer) => {
    if (window.confirm(`Are you sure you want to delete ${customer.first_name} ${customer.last_name}?`)) {
      setCustomers(customers.filter(c => c.id !== customer.id));
      setToast({
        open: true,
        message: `${customer.first_name} ${customer.last_name} has been deleted successfully`,
        severity: "success",
      });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customer List</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Customers</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">List</span>
        </nav>
      </div>

      {customers.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <h2 className="text-xl text-gray-500 mb-2">No customers found</h2>
            <p className="text-gray-400">Add some customers to see them here.</p>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Total Customers: <span className="font-semibold">{customers.length}</span>
            </p>
            <button
              onClick={() => window.location.href = '/customers/add'}
              className="px-4 py-2 bg-[#53B175] text-white rounded-md hover:bg-[#449d63] transition-colors"
            >
              Add New Customer
            </button>
          </div>
          <DataTableMy columns={columns} data={customers} />
        </div>
      )}

      {selectedCustomer && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Customer Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Name:</strong> {selectedCustomer.first_name} {selectedCustomer.last_name}</div>
            <div><strong>Email:</strong> {selectedCustomer.email}</div>
            <div><strong>Phone:</strong> {selectedCustomer.phone}</div>
            <div><strong>Job:</strong> {selectedCustomer.job}</div>
            <div><strong>Monthly Income:</strong> ${selectedCustomer.monthly_income.toLocaleString()}</div>
            <div><strong>Credit Status:</strong> {selectedCustomer.credit_status}</div>
            <div><strong>Marital Status:</strong> {selectedCustomer.marital_status}</div>
            <div><strong>Family Members:</strong> {selectedCustomer.family_members_count}</div>
          </div>
          {selectedCustomer.special_notes && (
            <div className="mt-3">
              <strong>Special Notes:</strong> {selectedCustomer.special_notes}
            </div>
          )}
          <button
            onClick={() => setSelectedCustomer(null)}
            className="mt-3 px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Close Details
          </button>
        </div>
      )}

      <ToastMessage
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
      />
    </div>
  );
}
