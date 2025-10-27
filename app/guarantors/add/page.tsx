"use client";
import { useState } from "react";
import ToastMessage from "@/app/components/ToastMessage";
import { AlertColor } from "@mui/material";

interface GuarantorFormData {
  guarantor_id: string;
  loan_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  relationship_to_borrower: string;
  employment_status: string;
  monthly_income: number;
  identification_type: string;
  identification_number: string;
  guarantee_amount: number;
  notes: string;
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

export default function AddGuarantor() {
  // Generate initial guarantor ID
  const [formData, setFormData] = useState<GuarantorFormData>(() => ({
    guarantor_id: `GUA-${Date.now()}`,
    loan_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    relationship_to_borrower: "",
    employment_status: "",
    monthly_income: 0,
    identification_type: "",
    identification_number: "",
    guarantee_amount: 0,
    notes: "",
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

  const relationshipOptions = [
    "Spouse",
    "Parent",
    "Sibling",
    "Child",
    "Friend",
    "Business Partner",
    "Colleague",
    "Other Family Member"
  ];

  const employmentStatuses = [
    "Employed",
    "Self-Employed",
    "Unemployed",
    "Retired",
    "Student"
  ];

  const identificationTypes = [
    "National ID",
    "Passport",
    "Driver's License",
    "Voter ID",
    "Social Security Card"
  ];

  const inputFields: InputField[] = [
    { 
      name: "guarantor_id", 
      label: "Guarantor ID", 
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
      name: "first_name", 
      label: "First Name", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "last_name", 
      label: "Last Name", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "email", 
      label: "Email", 
      type: "email", 
      field: "text" 
    },
    { 
      name: "phone", 
      label: "Phone", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "address", 
      label: "Address", 
      type: "text", 
      field: "textarea" 
    },
    { 
      name: "relationship_to_borrower", 
      label: "Relationship to Borrower", 
      type: "select", 
      field: "select",
      options: relationshipOptions.map(rel => ({
        value: rel,
        label: rel
      }))
    },
    { 
      name: "employment_status", 
      label: "Employment Status", 
      type: "select", 
      field: "select",
      options: employmentStatuses.map(status => ({
        value: status,
        label: status
      }))
    },
    { 
      name: "monthly_income", 
      label: "Monthly Income ($)", 
      type: "number", 
      field: "text" 
    },
    { 
      name: "identification_type", 
      label: "Identification Type", 
      type: "select", 
      field: "select",
      options: identificationTypes.map(type => ({
        value: type,
        label: type
      }))
    },
    { 
      name: "identification_number", 
      label: "Identification Number", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "guarantee_amount", 
      label: "Guarantee Amount ($)", 
      type: "number", 
      field: "text" 
    },
    { 
      name: "notes", 
      label: "Additional Notes", 
      type: "text", 
      field: "textarea" 
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
    if (name === "monthly_income" || name === "guarantee_amount") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.loan_id || !formData.first_name || !formData.last_name || !formData.phone) {
      setToast({
        open: true,
        message: "Please fill all required fields (Loan, First Name, Last Name, Phone)",
        severity: "error",
      });
      return;
    }

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setToast({
        open: true,
        message: "Please enter a valid email address",
        severity: "error",
      });
      return;
    }

    // Phone validation
    if (!/^\d{10}$/.test(formData.phone)) {
      setToast({
        open: true,
        message: "Please enter a valid 10-digit phone number",
        severity: "error",
      });
      return;
    }

    // Income validation
    if (formData.monthly_income < 0) {
      setToast({
        open: true,
        message: "Monthly income cannot be negative",
        severity: "error",
      });
      return;
    }

    // Guarantee amount validation
    if (formData.guarantee_amount <= 0) {
      setToast({
        open: true,
        message: "Guarantee amount must be greater than 0",
        severity: "error",
      });
      return;
    }

    try {
      setToast({
        open: true,
        message: "Adding guarantor...",
        severity: "info",
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setToast({
        open: true,
        message: "Guarantor added successfully!",
        severity: "success",
      });

      // Reset form with new guarantor ID
      const newGuarantorId = `GUA-${Date.now()}`;
      setFormData({
        guarantor_id: newGuarantorId,
        loan_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        relationship_to_borrower: "",
        employment_status: "",
        monthly_income: 0,
        identification_type: "",
        identification_number: "",
        guarantee_amount: 0,
        notes: "",
      });
    } catch {
      setToast({
        open: true,
        message: "An error has occurred while adding the guarantor",
        severity: "error",
      });
    }
  };

  const renderField = (field: InputField) => {
    if (field.type === "select") {
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {(field.name === "loan_id" || field.name === "first_name" || field.name === "last_name" || field.name === "phone") && <span className="text-red-500">*</span>}
          </label>
          <select
            name={field.name}
            value={formData[field.name as keyof GuarantorFormData]}
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
            value={formData[field.name as keyof GuarantorFormData]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:border-transparent"
            rows={3}
            placeholder={field.name === "address" ? "Enter full address" : "Enter additional notes (optional)"}
          />
        </div>
      );
    }

    return (
      <div key={field.name} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label} {(field.name === "loan_id" || field.name === "first_name" || field.name === "last_name" || field.name === "phone") && <span className="text-red-500">*</span>}
        </label>
        <input
          type={field.type}
          name={field.name}
          value={formData[field.name as keyof GuarantorFormData]}
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
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Guarantor</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Guarantors</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Add Guarantor</span>
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
            Add Guarantor
          </button>
          <button
            className="px-6 py-3 rounded-md w-full bg-gray-500 cursor-pointer text-white hover:bg-gray-600 transition-colors font-medium"
            onClick={() => window.location.href = '/guarantors/list'}
          >
            View All Guarantors
          </button>
        </div>
      </div>

      {/* Summary Information */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Guarantor Information</h3>
        <div className="text-sm text-blue-700">
          <p><strong>Guarantor ID:</strong> {formData.guarantor_id}</p>
          {formData.first_name && formData.last_name && (
            <p><strong>Name:</strong> {formData.first_name} {formData.last_name}</p>
          )}
          {formData.guarantee_amount > 0 && (
            <p><strong>Guarantee Amount:</strong> ${formData.guarantee_amount.toLocaleString()}</p>
          )}
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