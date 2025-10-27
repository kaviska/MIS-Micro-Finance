"use client";
import { useState } from "react";
import ToastMessage from "@/app/components/ToastMessage";
import { AlertColor } from "@mui/material";

interface BranchFormData {
  branch_id: string;
  branch_name: string;
  branch_code: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  email: string;
  manager_name: string;
  manager_contact: string;
  established_date: string;
  status: string;
  operating_hours: string;
  services_offered: string;
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

export default function AddBranch() {
  // Generate initial branch ID
  const [formData, setBranchFormData] = useState<BranchFormData>(() => ({
    branch_id: `BR-${Date.now()}`,
    branch_name: "",
    branch_code: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone: "",
    email: "",
    manager_name: "",
    manager_contact: "",
    established_date: new Date().toISOString().split('T')[0],
    status: "active",
    operating_hours: "",
    services_offered: "",
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

  const statusOptions = [
    "active",
    "inactive",
    "under-construction",
    "temporarily-closed"
  ];

  const inputFields: InputField[] = [
    { 
      name: "branch_id", 
      label: "Branch ID", 
      type: "text", 
      field: "text",
      disabled: true 
    },
    { 
      name: "branch_name", 
      label: "Branch Name", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "branch_code", 
      label: "Branch Code", 
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
      name: "city", 
      label: "City", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "state", 
      label: "State/Province", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "postal_code", 
      label: "Postal Code", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "country", 
      label: "Country", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "phone", 
      label: "Phone", 
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
      name: "manager_name", 
      label: "Branch Manager", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "manager_contact", 
      label: "Manager Contact", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "established_date", 
      label: "Established Date", 
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
        label: status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')
      }))
    },
    { 
      name: "operating_hours", 
      label: "Operating Hours", 
      type: "text", 
      field: "text" 
    },
    { 
      name: "services_offered", 
      label: "Services Offered", 
      type: "text", 
      field: "textarea" 
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
    
    setBranchFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.branch_name || !formData.branch_code || !formData.city || !formData.manager_name) {
      setToast({
        open: true,
        message: "Please fill all required fields (Branch Name, Code, City, Manager)",
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
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      setToast({
        open: true,
        message: "Please enter a valid 10-digit phone number",
        severity: "error",
      });
      return;
    }

    // Branch code validation (should be unique)
    if (formData.branch_code.length < 3) {
      setToast({
        open: true,
        message: "Branch code should be at least 3 characters long",
        severity: "error",
      });
      return;
    }

    try {
      setToast({
        open: true,
        message: "Creating branch...",
        severity: "info",
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setToast({
        open: true,
        message: "Branch created successfully!",
        severity: "success",
      });

      // Reset form with new branch ID
      const newBranchId = `BR-${Date.now()}`;
      setBranchFormData({
        branch_id: newBranchId,
        branch_name: "",
        branch_code: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        phone: "",
        email: "",
        manager_name: "",
        manager_contact: "",
        established_date: new Date().toISOString().split('T')[0],
        status: "active",
        operating_hours: "",
        services_offered: "",
        notes: "",
      });
    } catch {
      setToast({
        open: true,
        message: "An error has occurred while creating the branch",
        severity: "error",
      });
    }
  };

  const renderField = (field: InputField) => {
    if (field.type === "select") {
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {(field.name === "branch_name" || field.name === "branch_code" || field.name === "city" || field.name === "manager_name") && <span className="text-red-500">*</span>}
          </label>
          <select
            name={field.name}
            value={formData[field.name as keyof BranchFormData]}
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
            value={formData[field.name as keyof BranchFormData]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:border-transparent"
            rows={3}
            placeholder={
              field.name === "address" ? "Enter full branch address" :
              field.name === "services_offered" ? "List the services offered at this branch" :
              "Enter additional notes (optional)"
            }
          />
        </div>
      );
    }

    return (
      <div key={field.name} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label} {(field.name === "branch_name" || field.name === "branch_code" || field.name === "city" || field.name === "manager_name") && <span className="text-red-500">*</span>}
        </label>
        <input
          type={field.type}
          name={field.name}
          value={formData[field.name as keyof BranchFormData]}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:border-transparent"
          disabled={field.disabled}
          placeholder={
            field.name === "operating_hours" ? "e.g., Mon-Fri 9:00 AM - 5:00 PM" :
            field.name === "branch_code" ? "e.g., NYC001, LA002" :
            ""
          }
        />
      </div>
    );
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Branch</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Branches</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Add Branch</span>
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
            Create Branch
          </button>
          <button
            className="px-6 py-3 rounded-md w-full bg-gray-500 cursor-pointer text-white hover:bg-gray-600 transition-colors font-medium"
            onClick={() => window.location.href = '/branches/list'}
          >
            View All Branches
          </button>
        </div>
      </div>

      {/* Summary Information */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Branch Information</h3>
        <div className="text-sm text-blue-700">
          <p><strong>Branch ID:</strong> {formData.branch_id}</p>
          {formData.branch_name && <p><strong>Name:</strong> {formData.branch_name}</p>}
          {formData.branch_code && <p><strong>Code:</strong> {formData.branch_code}</p>}
          <p><strong>Status:</strong> {formData.status.charAt(0).toUpperCase() + formData.status.slice(1).replace('-', ' ')}</p>
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