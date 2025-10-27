"use client";
import { useState } from "react";
import ToastMessage from "@/app/components/ToastMessage";
import { AlertColor } from "@mui/material";

interface RepaymentFormData {
  repayment_id: string;
  loan_id: string;
  customer_name: string;
  amount: number;
  payment_date: string;
  payment_method: string;
  transaction_reference: string;
  notes: string;
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

export default function AddRepayment() {
  // Generate initial repayment ID
  const [formData, setFormData] = useState<RepaymentFormData>(() => ({
    repayment_id: `REP-${Date.now()}`,
    loan_id: "",
    customer_name: "",
    amount: 0,
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: "",
    transaction_reference: "",
    notes: "",
    status: "completed",
  }));

  const [activeLoans] = useState([
    { value: "LOAN-001", label: "LOAN-001 - John Doe ($15,000)" },
    { value: "LOAN-002", label: "LOAN-002 - Jane Smith ($25,000)" },
    { value: "LOAN-003", label: "LOAN-003 - Michael Johnson ($8,000)" },
    { value: "LOAN-004", label: "LOAN-004 - Sarah Williams ($12,000)" },
    { value: "LOAN-005", label: "LOAN-005 - David Brown ($30,000)" },
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

  const paymentMethods = [
    "Cash",
    "Bank Transfer",
    "Check",
    "Mobile Money",
    "Credit Card",
    "Debit Card"
  ];

  const statusOptions = [
    "completed",
    "pending",
    "failed",
    "reversed"
  ];

  const inputFields: InputField[] = [
    { 
      name: "repayment_id", 
      label: "Repayment ID", 
      type: "text", 
      field: "text",
      disabled: true 
    },
    { 
      name: "loan_id", 
      label: "Loan", 
      type: "select", 
      field: "select",
      options: activeLoans
    },
    { 
      name: "customer_name", 
      label: "Customer Name", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "amount", 
      label: "Repayment Amount ($)", 
      type: "number", 
      field: "text" 
    },
    { 
      name: "payment_date", 
      label: "Payment Date", 
      type: "date", 
      field: "text" 
    },
    { 
      name: "payment_method", 
      label: "Payment Method", 
      type: "select", 
      field: "select",
      options: paymentMethods.map(method => ({
        value: method,
        label: method
      }))
    },
    { 
      name: "transaction_reference", 
      label: "Transaction Reference", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "notes", 
      label: "Notes", 
      type: "text", 
      field: "textarea" 
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
    if (name === "amount") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Auto-populate customer name when loan is selected
    if (name === "loan_id" && value) {
      const selectedLoan = activeLoans.find(loan => loan.value === value);
      if (selectedLoan) {
        const customerName = selectedLoan.label.split(" - ")[1].split(" (")[0];
        setFormData(prev => ({ ...prev, customer_name: customerName }));
      }
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.loan_id || !formData.amount || !formData.payment_method) {
      setToast({
        open: true,
        message: "Please fill all required fields (Loan, Amount, Payment Method)",
        severity: "error",
      });
      return;
    }

    // Amount validation
    if (formData.amount <= 0) {
      setToast({
        open: true,
        message: "Repayment amount must be greater than 0",
        severity: "error",
      });
      return;
    }

    // Date validation
    const paymentDate = new Date(formData.payment_date);
    const today = new Date();
    
    if (paymentDate > today) {
      setToast({
        open: true,
        message: "Payment date cannot be in the future",
        severity: "error",
      });
      return;
    }

    try {
      setToast({
        open: true,
        message: "Processing repayment...",
        severity: "info",
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setToast({
        open: true,
        message: "Repayment recorded successfully!",
        severity: "success",
      });

      // Reset form with new repayment ID
      const newRepaymentId = `REP-${Date.now()}`;
      setFormData({
        repayment_id: newRepaymentId,
        loan_id: "",
        customer_name: "",
        amount: 0,
        payment_date: new Date().toISOString().split('T')[0],
        payment_method: "",
        transaction_reference: "",
        notes: "",
        status: "completed",
      });
    } catch {
      setToast({
        open: true,
        message: "An error has occurred while processing the repayment",
        severity: "error",
      });
    }
  };

  const renderField = (field: InputField) => {
    if (field.type === "select") {
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {(field.name === "loan_id" || field.name === "amount" || field.name === "payment_method") && <span className="text-red-500">*</span>}
          </label>
          <select
            name={field.name}
            value={formData[field.name as keyof RepaymentFormData]}
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
            value={formData[field.name as keyof RepaymentFormData]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:border-transparent"
            rows={3}
            placeholder="Enter additional notes (optional)"
          />
        </div>
      );
    }

    return (
      <div key={field.name} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label} {(field.name === "loan_id" || field.name === "amount" || field.name === "payment_method") && <span className="text-red-500">*</span>}
        </label>
        <input
          type={field.type}
          name={field.name}
          value={formData[field.name as keyof RepaymentFormData]}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:border-transparent"
          disabled={field.disabled}
          min={field.type === "number" ? 0 : undefined}
          step={field.type === "number" ? 0.01 : undefined}
          readOnly={field.name === "customer_name"}
        />
      </div>
    );
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Record Repayment</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Repayments</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Add Repayment</span>
        </nav>
      </div>

      {/* Main Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map((field) => renderField(field))}
        </div>
        
        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            className="px-6 py-3 rounded-md w-full bg-[#53B175] cursor-pointer text-white hover:bg-[#449d63] transition-colors font-medium"
            onClick={handleSubmit}
          >
            Record Repayment
          </button>
          <button
            className="px-6 py-3 rounded-md w-full bg-gray-500 cursor-pointer text-white hover:bg-gray-600 transition-colors font-medium"
            onClick={() => window.location.href = '/repayments/list'}
          >
            View All Repayments
          </button>
        </div>
      </div>

      {/* Summary Information */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Repayment Information</h3>
        <div className="text-sm text-blue-700">
          <p><strong>Repayment ID:</strong> {formData.repayment_id}</p>
          <p><strong>Status:</strong> {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}</p>
          <p><strong>Payment Date:</strong> {formData.payment_date}</p>
          {formData.amount > 0 && <p><strong>Amount:</strong> ${formData.amount.toLocaleString()}</p>}
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