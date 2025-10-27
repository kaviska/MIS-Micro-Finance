"use client";
import { useState } from "react";
import ToastMessage from "@/app/components/ToastMessage";
import FormGenerator from "@/app/components/FormGenerator";
import { AlertColor } from "@mui/material";

interface CustomerFormData {
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

export default function AddCustomer() {
  const [formData, setFormData] = useState<CustomerFormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    job: "",
    monthly_income: 0,
    credit_status: "",
    marital_status: "",
    family_members_count: 0,
    special_notes: "",
  });

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const inputFields = [
    { name: "first_name", label: "First Name", type: "text", field: "text" },
    { name: "last_name", label: "Last Name", type: "text", field: "text" },
    { name: "email", label: "Email", type: "email", field: "text" },
    { name: "phone", label: "Phone", type: "text", field: "text" },
    { name: "job", label: "Job", type: "text", field: "text" },
    { name: "monthly_income", label: "Monthly Income", type: "number", field: "text" },
    { name: "credit_status", label: "Credit Status", type: "text", field: "text" },
    { name: "marital_status", label: "Marital Status", type: "text", field: "text" },
    { name: "family_members_count", label: "Family Members Count", type: "number", field: "text" },
    { name: "special_notes", label: "Special Notes", type: "text", field: "text" },
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
    if (name === "monthly_income" || name === "family_members_count") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone) {
      // Phone number validation for 10 digits
      if (!/^\d{10}$/.test(formData.phone)) {
        setToast({
          open: true,
          message: "Please enter a valid 10-digit phone number",
          severity: "error",
        });
        return;
      }

      setToast({
        open: true,
        message: "Please fill all required fields (First Name, Last Name, Email, Phone)",
        severity: "error",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
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

    // Monthly income validation
    if (formData.monthly_income <= 0) {
      setToast({
        open: true,
        message: "Monthly income must be greater than 0",
        severity: "error",
      });
      return;
    }

    // Family members count validation
    if (formData.family_members_count < 0) {
      setToast({
        open: true,
        message: "Family members count cannot be negative",
        severity: "error",
      });
      return;
    }

    try {
      setToast({
        open: true,
        message: "Adding customer...",
        severity: "info",
      });

      // Simulate API call since we're only doing frontend for now
      await new Promise(resolve => setTimeout(resolve, 1000));

      setToast({
        open: true,
        message: "Customer added successfully!",
        severity: "success",
      });

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        job: "",
        monthly_income: 0,
        credit_status: "",
        marital_status: "",
        family_members_count: 0,
        special_notes: "",
      });
    } catch (error) {
      setToast({
        open: true,
        message: "An error has occurred",
        severity: "error",
      });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Customer</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Customers</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Add Customer</span>
        </nav>
      </div>

      <div className="mt-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map((field) => (
            <FormGenerator
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              value={formData[field.name as keyof CustomerFormData]}
              onChange={handleChange}
            />
          ))}
        </div>
        <div className="mt-5 flex gap-3">
          <button
            className="px-3 py-3 rounded-[6px] w-full bg-[#53B175] cursor-pointer text-white hover:bg-[#449d63] transition-colors"
            onClick={handleSubmit}
          >
            Add Customer
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
