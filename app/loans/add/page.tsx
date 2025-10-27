"use client";
import { useState } from "react";
import ToastMessage from "@/app/components/ToastMessage";
import { AlertColor } from "@mui/material";

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
}

interface LoanFormData {
  application_id: string;
  customer_id: string;
  loan_amount_requested: number;
  loan_purpose: string;
  collateral: string;
  requested_date: string;
  status: string;
}

interface Option {
  value: string;
  label: string;
}

interface InputField {
  name: string;
  label: string;
  type: string;
  field: string;
  disabled?: boolean;
  options?: Option[];
}

export default function AddLoan() {
  // Generate initial application ID
  const [formData, setFormData] = useState<LoanFormData>(() => ({
    application_id: `APP-${Date.now()}`,
    customer_id: "",
    loan_amount_requested: 0,
    loan_purpose: "",
    collateral: "",
    requested_date: new Date().toISOString().split('T')[0], // Default to today's date
    status: "pending",
  }));

  const [customers] = useState<Customer[]>([
    { id: 1, first_name: "John", last_name: "Doe" },
    { id: 2, first_name: "Jane", last_name: "Smith" },
    { id: 3, first_name: "Michael", last_name: "Johnson" },
    { id: 4, first_name: "Sarah", last_name: "Williams" },
    { id: 5, first_name: "David", last_name: "Brown" },
  ]);

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const loanPurposes = [
    "Business Expansion",
    "Home Improvement",
    "Education",
    "Medical Emergency",
    "Agriculture",
    "Vehicle Purchase",
    "Debt Consolidation",
    "Working Capital",
    "Equipment Purchase",
    "Other"
  ];

  const statusOptions = [
    "pending",
    "approved",
    "rejected"
  ];

  const inputFields = [
    { 
      name: "application_id", 
      label: "Application ID", 
      type: "text", 
      field: "text",
      disabled: true 
    },
    { 
      name: "customer_id", 
      label: "Customer", 
      type: "select", 
      field: "select",
      options: customers.map(customer => ({
        value: customer.id.toString(),
        label: `${customer.first_name} ${customer.last_name}`
      }))
    },
    { 
      name: "loan_amount_requested", 
      label: "Loan Amount Requested ($)", 
      type: "number", 
      field: "text" 
    },
    { 
      name: "loan_purpose", 
      label: "Loan Purpose", 
      type: "select", 
      field: "select",
      options: loanPurposes.map(purpose => ({
        value: purpose,
        label: purpose
      }))
    },
    { 
      name: "collateral", 
      label: "Collateral (if any)", 
      type: "text", 
      field: "textarea" 
    },
    { 
      name: "requested_date", 
      label: "Requested Date", 
      type: "date", 
      field: "text" 
    },
    { 
      name: "status", 
      label: "Status", 
      type: "select", 
      field: "select",
      options: statusOptions.map(status => ({
        value: status,
        label: status.charAt(0).toUpperCase() + status.slice(1)
      }))
    },
  ];

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    
    // Handle number fields
    if (name === "loan_amount_requested") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.customer_id || !formData.loan_amount_requested || !formData.loan_purpose) {
      setToast({
        open: true,
        message: "Please fill all required fields (Customer, Loan Amount, Loan Purpose)",
        severity: "error",
      });
      return;
    }

    // Loan amount validation
    if (formData.loan_amount_requested <= 0) {
      setToast({
        open: true,
        message: "Loan amount must be greater than 0",
        severity: "error",
      });
      return;
    }

    // Maximum loan amount validation (example: $100,000)
    if (formData.loan_amount_requested > 100000) {
      setToast({
        open: true,
        message: "Loan amount cannot exceed $100,000",
        severity: "error",
      });
      return;
    }

    // Date validation
    const requestedDate = new Date(formData.requested_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (requestedDate < today) {
      setToast({
        open: true,
        message: "Requested date cannot be in the past",
        severity: "error",
      });
      return;
    }

    try {
      setToast({
        open: true,
        message: "Processing loan application...",
        severity: "info",
      });

      // Simulate API call since we're only doing frontend for now
      await new Promise(resolve => setTimeout(resolve, 1500));

      setToast({
        open: true,
        message: "Loan application submitted successfully!",
        severity: "success",
      });

      // Reset form with new application ID
      const newAppId = `APP-${Date.now()}`;
      setFormData({
        application_id: newAppId,
        customer_id: "",
        loan_amount_requested: 0,
        loan_purpose: "",
        collateral: "",
        requested_date: new Date().toISOString().split('T')[0],
        status: "pending",
      });
    } catch {
      setToast({
        open: true,
        message: "An error has occurred while processing the loan application",
        severity: "error",
      });
    }
  };

  const renderField = (field: InputField) => {
    if (field.type === "select") {
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {(field.name === "customer_id" || field.name === "loan_amount_requested" || field.name === "loan_purpose") && <span className="text-red-500">*</span>}
          </label>
          <select
            name={field.name}
            value={formData[field.name as keyof LoanFormData]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:border-transparent"
            disabled={field.disabled}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option: Option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (field.field === "textarea") {
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <textarea
            name={field.name}
            value={formData[field.name as keyof LoanFormData]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:border-transparent"
            rows={3}
            placeholder="Enter collateral details (optional)"
          />
        </div>
      );
    }

    return (
      <div key={field.name} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label} {(field.name === "customer_id" || field.name === "loan_amount_requested" || field.name === "loan_purpose") && <span className="text-red-500">*</span>}
        </label>
        <input
          type={field.type}
          name={field.name}
          value={formData[field.name as keyof LoanFormData]}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:border-transparent"
          disabled={field.disabled}
          min={field.type === "number" ? 0 : undefined}
          step={field.type === "number" ? 0.01 : undefined}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Loan Application</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Loans</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Add Loan</span>
        </nav>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map((field) => renderField(field))}
        </div>
        
        <div className="mt-6 flex gap-3">
          <button
            className="px-6 py-3 rounded-md w-full bg-[#53B175] cursor-pointer text-white hover:bg-[#449d63] transition-colors font-medium"
            onClick={handleSubmit}
          >
            Submit Loan Application
          </button>
          <button
            className="px-6 py-3 rounded-md w-full bg-gray-500 cursor-pointer text-white hover:bg-gray-600 transition-colors font-medium"
            onClick={() => window.location.href = '/loans/list'}
          >
            View All Loans
          </button>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Application Information</h3>
        <div className="text-sm text-blue-700">
          <p><strong>Application ID:</strong> {formData.application_id}</p>
          <p><strong>Status:</strong> {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}</p>
          <p><strong>Date:</strong> {formData.requested_date}</p>
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
