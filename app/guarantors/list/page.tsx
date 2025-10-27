"use client";
import DataTableMy from "@/app/components/DataTable";
import { useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { AlertColor } from "@mui/material";
import ToastMessage from "@/app/components/ToastMessage";

interface Guarantor {
  id: number;
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

export default function ViewGuarantors() {
  // Sample guarantor data for demonstration
  const sampleGuarantors: Guarantor[] = [
    {
      id: 1,
      guarantor_id: "GUA-1698234567890",
      loan_id: "LOAN-001",
      first_name: "Mary",
      last_name: "Johnson",
      email: "mary.johnson@email.com",
      phone: "1234567890",
      address: "123 Oak Street, Springfield, IL 62701",
      relationship_to_borrower: "Spouse",
      employment_status: "Employed",
      monthly_income: 4500,
      identification_type: "National ID",
      identification_number: "ID123456789",
      guarantee_amount: 15000,
      notes: "Primary guarantor with stable income"
    },
    {
      id: 2,
      guarantor_id: "GUA-1698234567891",
      loan_id: "LOAN-002",
      first_name: "Robert",
      last_name: "Wilson",
      email: "robert.wilson@email.com",
      phone: "0987654321",
      address: "456 Pine Avenue, Chicago, IL 60601",
      relationship_to_borrower: "Brother",
      employment_status: "Self-Employed",
      monthly_income: 6000,
      identification_type: "Driver's License",
      identification_number: "DL987654321",
      guarantee_amount: 25000,
      notes: "Business owner with good credit history"
    },
    {
      id: 3,
      guarantor_id: "GUA-1698234567892",
      loan_id: "LOAN-003",
      first_name: "Lisa",
      last_name: "Davis",
      email: "lisa.davis@email.com",
      phone: "5555555555",
      address: "789 Maple Drive, Milwaukee, WI 53201",
      relationship_to_borrower: "Friend",
      employment_status: "Employed",
      monthly_income: 3800,
      identification_type: "Passport",
      identification_number: "P123456789",
      guarantee_amount: 8000,
      notes: "Long-time friend, teacher profession"
    },
    {
      id: 4,
      guarantor_id: "GUA-1698234567893",
      loan_id: "LOAN-004",
      first_name: "James",
      last_name: "Brown",
      email: "james.brown@email.com",
      phone: "7777777777",
      address: "321 Cedar Lane, Madison, WI 53703",
      relationship_to_borrower: "Father",
      employment_status: "Retired",
      monthly_income: 2500,
      identification_type: "National ID",
      identification_number: "ID987654321",
      guarantee_amount: 12000,
      notes: "Retired with pension income"
    },
    {
      id: 5,
      guarantor_id: "GUA-1698234567894",
      loan_id: "LOAN-005",
      first_name: "Jennifer",
      last_name: "Miller",
      email: "jennifer.miller@email.com",
      phone: "8888888888",
      address: "654 Birch Street, Green Bay, WI 54301",
      relationship_to_borrower: "Business Partner",
      employment_status: "Self-Employed",
      monthly_income: 7500,
      identification_type: "Driver's License",
      identification_number: "DL123456789",
      guarantee_amount: 30000,
      notes: "Co-owner of successful business"
    }
  ];

  const [guarantors, setGuarantors] = useState<Guarantor[]>(sampleGuarantors);
  const [selectedGuarantor, setSelectedGuarantor] = useState<Guarantor | null>(null);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Table columns configuration
  const columns = [
    {
      name: "Guarantor ID",
      selector: (row: Guarantor) => row.guarantor_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Full Name",
      selector: (row: Guarantor) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Loan ID",
      selector: (row: Guarantor) => row.loan_id,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row: Guarantor) => row.phone,
      sortable: true,
    },
    {
      name: "Relationship",
      selector: (row: Guarantor) => row.relationship_to_borrower,
      sortable: true,
    },
    {
      name: "Employment",
      selector: (row: Guarantor) => row.employment_status,
      sortable: true,
      cell: (row: Guarantor) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.employment_status === "Employed"
              ? "bg-green-100 text-green-800"
              : row.employment_status === "Self-Employed"
              ? "bg-blue-100 text-blue-800"
              : row.employment_status === "Retired"
              ? "bg-purple-100 text-purple-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.employment_status}
        </span>
      ),
    },
    {
      name: "Monthly Income",
      selector: (row: Guarantor) => `$${row.monthly_income.toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Guarantee Amount",
      selector: (row: Guarantor) => `$${row.guarantee_amount.toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Guarantor) => (
        <div className="flex gap-2 cursor-pointer">
          <button
            className="cursor-pointer"
            onClick={() => handleView(row)}
            title="View Guarantor Details"
          >
            <RemoveRedEyeIcon fontSize="small" color="action" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleContact(row)}
            title="Contact Guarantor"
          >
            <ContactMailIcon fontSize="small" color="primary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleUpdate(row)}
            title="Update Guarantor"
          >
            <UpdateIcon fontSize="small" color="primary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleDelete(row)}
            title="Delete Guarantor"
          >
            <HighlightOffIcon fontSize="small" color="error" />
          </button>
        </div>
      ),
    },
  ];

  // Event handlers
  const handleView = (guarantor: Guarantor) => {
    setSelectedGuarantor(guarantor);
    setToast({
      open: true,
      message: `Viewing details for guarantor ${guarantor.first_name} ${guarantor.last_name}`,
      severity: "info",
    });
  };

  const handleContact = (guarantor: Guarantor) => {
    setToast({
      open: true,
      message: `Contact functionality for ${guarantor.first_name} ${guarantor.last_name} will be implemented soon`,
      severity: "info",
    });
  };

  const handleUpdate = (guarantor: Guarantor) => {
    setToast({
      open: true,
      message: `Update functionality for guarantor ${guarantor.guarantor_id} will be implemented soon`,
      severity: "info",
    });
  };

  const handleDelete = (guarantor: Guarantor) => {
    if (window.confirm(`Are you sure you want to delete guarantor ${guarantor.first_name} ${guarantor.last_name}?`)) {
      setGuarantors(guarantors.filter(g => g.id !== guarantor.id));
      setToast({
        open: true,
        message: `Guarantor ${guarantor.first_name} ${guarantor.last_name} has been deleted successfully`,
        severity: "success",
      });
    }
  };

  // Calculate statistics
  const getStatistics = () => {
    const employed = guarantors.filter(g => g.employment_status === "Employed").length;
    const selfEmployed = guarantors.filter(g => g.employment_status === "Self-Employed").length;
    const totalGuaranteeAmount = guarantors.reduce((sum, g) => sum + g.guarantee_amount, 0);
    const avgIncome = guarantors.reduce((sum, g) => sum + g.monthly_income, 0) / guarantors.length;
    
    return { employed, selfEmployed, totalGuaranteeAmount, avgIncome };
  };

  const statistics = getStatistics();

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Guarantors</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Guarantors</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">List</span>
        </nav>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Total Guarantors</h3>
          <p className="text-2xl font-bold text-blue-600">{guarantors.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Employed</h3>
          <p className="text-2xl font-bold text-green-600">{statistics.employed}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Self-Employed</h3>
          <p className="text-2xl font-bold text-blue-600">{statistics.selfEmployed}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Total Guarantee</h3>
          <p className="text-2xl font-bold text-purple-600">${statistics.totalGuaranteeAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Main Content */}
      {guarantors.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <h2 className="text-xl text-gray-500 mb-2">No guarantors found</h2>
            <p className="text-gray-400">Add some guarantors to see them here.</p>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Total Guarantors: <span className="font-semibold">{guarantors.length}</span>
            </p>
            <button
              onClick={() => window.location.href = '/guarantors/add'}
              className="px-4 py-2 bg-[#53B175] text-white rounded-md hover:bg-[#449d63] transition-colors"
            >
              Add New Guarantor
            </button>
          </div>
          <DataTableMy columns={columns} data={guarantors} />
        </div>
      )}

      {/* Detailed View Modal */}
      {selectedGuarantor && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Guarantor Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Guarantor ID:</strong> {selectedGuarantor.guarantor_id}</div>
            <div><strong>Name:</strong> {selectedGuarantor.first_name} {selectedGuarantor.last_name}</div>
            <div><strong>Loan ID:</strong> {selectedGuarantor.loan_id}</div>
            <div><strong>Email:</strong> {selectedGuarantor.email}</div>
            <div><strong>Phone:</strong> {selectedGuarantor.phone}</div>
            <div><strong>Relationship:</strong> {selectedGuarantor.relationship_to_borrower}</div>
            <div><strong>Employment:</strong> {selectedGuarantor.employment_status}</div>
            <div><strong>Monthly Income:</strong> ${selectedGuarantor.monthly_income.toLocaleString()}</div>
            <div><strong>ID Type:</strong> {selectedGuarantor.identification_type}</div>
            <div><strong>ID Number:</strong> {selectedGuarantor.identification_number}</div>
            <div><strong>Guarantee Amount:</strong> ${selectedGuarantor.guarantee_amount.toLocaleString()}</div>
          </div>
          {selectedGuarantor.address && (
            <div className="mt-4">
              <strong>Address:</strong> {selectedGuarantor.address}
            </div>
          )}
          {selectedGuarantor.notes && (
            <div className="mt-4">
              <strong>Notes:</strong> {selectedGuarantor.notes}
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setSelectedGuarantor(null)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Close Details
            </button>
            <button
              onClick={() => handleContact(selectedGuarantor)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Contact Guarantor
            </button>
          </div>
        </div>
      )}

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