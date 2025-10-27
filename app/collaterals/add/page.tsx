"use client";
import { useState } from "react";
import ToastMessage from "@/app/components/ToastMessage";
import { AlertColor } from "@mui/material";

interface CollateralFormData {
  collateral_id: string;
  loan_id: string;
  collateral_type: string;
  description: string;
  estimated_value: number;
  current_value: number;
  location: string;
  ownership_documents: string;
  insurance_details: string;
  condition_status: string;
  valuation_date: string;
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

export default function AddCollateral() {
  // Generate initial collateral ID
  const [formData, setFormData] = useState<CollateralFormData>(() => ({
    collateral_id: `COL-${Date.now()}`,
    loan_id: "",
    collateral_type: "",
    description: "",
    estimated_value: 0,
    current_value: 0,
    location: "",
    ownership_documents: "",
    insurance_details: "",
    condition_status: "",
    valuation_date: new Date().toISOString().split('T')[0],
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

  const collateralTypes = [
    "Real Estate",
    "Vehicle",
    "Machinery",
    "Equipment",
    "Jewelry",
    "Electronics",
    "Inventory",
    "Securities",
    "Art & Collectibles",
    "Other"
  ];

  const conditionStatuses = [
    "Excellent",
    "Good",
    "Fair",
    "Poor",
    "Under Evaluation"
  ];

  const inputFields: InputField[] = [
    { 
      name: "collateral_id", 
      label: "Collateral ID", 
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
      name: "collateral_type", 
      label: "Collateral Type", 
      type: "select", 
      field: "select",
      options: collateralTypes.map(type => ({
        value: type,
        label: type
      }))
    },
    { 
      name: "description", 
      label: "Description", 
      type: "text", 
      field: "textarea" 
    },
    { 
      name: "estimated_value", 
      label: "Estimated Value ($)", 
      type: "number", 
      field: "text" 
    },
    { 
      name: "current_value", 
      label: "Current Value ($)", 
      type: "number", 
      field: "text" 
    },
    { 
      name: "location", 
      label: "Location", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "ownership_documents", 
      label: "Ownership Documents", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "insurance_details", 
      label: "Insurance Details", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "condition_status", 
      label: "Condition Status", 
      type: "select", 
      field: "select",
      options: conditionStatuses.map(status => ({
        value: status,
        label: status
      }))
    },
    { 
      name: "valuation_date", 
      label: "Valuation Date", 
      type: "date", 
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
    if (name === "estimated_value" || name === "current_value") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.loan_id || !formData.collateral_type || !formData.description) {
      setToast({
        open: true,
        message: "Please fill all required fields (Loan, Collateral Type, Description)",
        severity: "error",
      });
      return;
    }

    // Value validation
    if (formData.estimated_value <= 0) {
      setToast({
        open: true,
        message: "Estimated value must be greater than 0",
        severity: "error",
      });
      return;
    }

    if (formData.current_value < 0) {
      setToast({
        open: true,
        message: "Current value cannot be negative",
        severity: "error",
      });
      return;
    }

    try {
      setToast({
        open: true,
        message: "Adding collateral...",
        severity: "info",
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setToast({
        open: true,
        message: "Collateral added successfully!",
        severity: "success",
      });

      // Reset form with new collateral ID
      const newCollateralId = `COL-${Date.now()}`;
      setFormData({
        collateral_id: newCollateralId,
        loan_id: "",
        collateral_type: "",
        description: "",
        estimated_value: 0,
        current_value: 0,
        location: "",
        ownership_documents: "",
        insurance_details: "",
        condition_status: "",
        valuation_date: new Date().toISOString().split('T')[0],
        notes: "",
      });
    } catch {
      setToast({
        open: true,
        message: "An error has occurred while adding the collateral",
        severity: "error",
      });
    }
  };

  const renderField = (field: InputField) => {
    if (field.type === "select") {
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {(field.name === "loan_id" || field.name === "collateral_type" || field.name === "description") && <span className="text-red-500">*</span>}
          </label>
          <select
            name={field.name}
            value={formData[field.name as keyof CollateralFormData]}
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
            {field.label} {field.name === "description" && <span className="text-red-500">*</span>}
          </label>
          <textarea
            name={field.name}
            value={formData[field.name as keyof CollateralFormData]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:border-transparent"
            rows={3}
            placeholder={field.name === "description" ? "Enter detailed description of the collateral" : "Enter additional notes (optional)"}
          />
        </div>
      );
    }

    return (
      <div key={field.name} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label} {(field.name === "loan_id" || field.name === "collateral_type" || field.name === "description") && <span className="text-red-500">*</span>}
        </label>
        <input
          type={field.type}
          name={field.name}
          value={formData[field.name as keyof CollateralFormData]}
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
        <h1 className="text-2xl font-bold text-gray-800">Add Collateral</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Collaterals</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Add Collateral</span>
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
            Add Collateral
          </button>
          <button
            className="px-6 py-3 rounded-md w-full bg-gray-500 cursor-pointer text-white hover:bg-gray-600 transition-colors font-medium"
            onClick={() => window.location.href = '/collaterals/list'}
          >
            View All Collaterals
          </button>
        </div>
      </div>

      {/* Summary Information */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Collateral Information</h3>
        <div className="text-sm text-blue-700">
          <p><strong>Collateral ID:</strong> {formData.collateral_id}</p>
          {formData.collateral_type && <p><strong>Type:</strong> {formData.collateral_type}</p>}
          {formData.estimated_value > 0 && (
            <p><strong>Estimated Value:</strong> ${formData.estimated_value.toLocaleString()}</p>
          )}
          <p><strong>Valuation Date:</strong> {formData.valuation_date}</p>
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