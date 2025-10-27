"use client";
import DataTableMy from "@/app/components/DataTable";
import { useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { AlertColor } from "@mui/material";
import ToastMessage from "@/app/components/ToastMessage";

interface Loan {
  id: number;
  application_id: string;
  customer_name: string;
  customer_email: string;
  loan_amount_requested: number;
  loan_purpose: string;
  collateral: string;
  requested_date: string;
  status: "pending" | "approved" | "rejected";
}

export default function ViewLoans() {
  // Sample data for demonstration
  const sampleLoans: Loan[] = [
    {
      id: 1,
      application_id: "APP-1698234567890",
      customer_name: "John Doe",
      customer_email: "john.doe@email.com",
      loan_amount_requested: 15000,
      loan_purpose: "Business Expansion",
      collateral: "Commercial property at 123 Main St",
      requested_date: "2024-10-15",
      status: "pending"
    },
    {
      id: 2,
      application_id: "APP-1698234567891",
      customer_name: "Jane Smith",
      customer_email: "jane.smith@email.com",
      loan_amount_requested: 25000,
      loan_purpose: "Home Improvement",
      collateral: "Residential property deed",
      requested_date: "2024-10-20",
      status: "approved"
    },
    {
      id: 3,
      application_id: "APP-1698234567892",
      customer_name: "Michael Johnson",
      customer_email: "michael.johnson@email.com",
      loan_amount_requested: 8000,
      loan_purpose: "Education",
      collateral: "None",
      requested_date: "2024-10-22",
      status: "rejected"
    },
    {
      id: 4,
      application_id: "APP-1698234567893",
      customer_name: "Sarah Williams",
      customer_email: "sarah.williams@email.com",
      loan_amount_requested: 12000,
      loan_purpose: "Medical Emergency",
      collateral: "Vehicle title",
      requested_date: "2024-10-25",
      status: "pending"
    },
    {
      id: 5,
      application_id: "APP-1698234567894",
      customer_name: "David Brown",
      customer_email: "david.brown@email.com",
      loan_amount_requested: 30000,
      loan_purpose: "Agriculture",
      collateral: "Farm equipment and land",
      requested_date: "2024-10-26",
      status: "approved"
    }
  ];

  const [loans, setLoans] = useState<Loan[]>(sampleLoans);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
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
      name: "Application ID",
      selector: (row: Loan) => row.application_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Customer",
      selector: (row: Loan) => row.customer_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: Loan) => row.customer_email,
      sortable: true,
    },
    {
      name: "Loan Amount",
      selector: (row: Loan) => `$${row.loan_amount_requested.toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Purpose",
      selector: (row: Loan) => row.loan_purpose,
      sortable: true,
    },
    {
      name: "Requested Date",
      selector: (row: Loan) => new Date(row.requested_date).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: Loan) => row.status,
      sortable: true,
      cell: (row: Loan) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.status === "approved"
              ? "bg-green-100 text-green-800"
              : row.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row: Loan) => (
        <div className="flex gap-2 cursor-pointer">
          <button
            className="cursor-pointer"
            onClick={() => handleView(row)}
            title="View Loan Details"
          >
            <RemoveRedEyeIcon fontSize="small" color="action" />
          </button>
          {row.status === "pending" && (
            <>
              <button
                className="cursor-pointer"
                onClick={() => handleApprove(row)}
                title="Approve Loan"
              >
                <CheckCircleIcon fontSize="small" color="success" />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => handleReject(row)}
                title="Reject Loan"
              >
                <CancelIcon fontSize="small" color="error" />
              </button>
            </>
          )}
          <button
            className="cursor-pointer"
            onClick={() => handleUpdate(row)}
            title="Update Loan"
          >
            <UpdateIcon fontSize="small" color="primary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleDelete(row)}
            title="Delete Loan"
          >
            <HighlightOffIcon fontSize="small" color="error" />
          </button>
        </div>
      ),
    },
  ];

  const handleView = (loan: Loan) => {
    setSelectedLoan(loan);
    setToast({
      open: true,
      message: `Viewing details for application ${loan.application_id}`,
      severity: "info",
    });
  };

  const handleApprove = (loan: Loan) => {
    if (window.confirm(`Are you sure you want to approve loan application ${loan.application_id}?`)) {
      setLoans(loans.map(l => 
        l.id === loan.id ? { ...l, status: "approved" as const } : l
      ));
      setToast({
        open: true,
        message: `Loan application ${loan.application_id} has been approved`,
        severity: "success",
      });
    }
  };

  const handleReject = (loan: Loan) => {
    if (window.confirm(`Are you sure you want to reject loan application ${loan.application_id}?`)) {
      setLoans(loans.map(l => 
        l.id === loan.id ? { ...l, status: "rejected" as const } : l
      ));
      setToast({
        open: true,
        message: `Loan application ${loan.application_id} has been rejected`,
        severity: "warning",
      });
    }
  };

  const handleUpdate = (loan: Loan) => {
    setToast({
      open: true,
      message: `Update functionality for application ${loan.application_id} will be implemented soon`,
      severity: "info",
    });
  };

  const handleDelete = (loan: Loan) => {
    if (window.confirm(`Are you sure you want to delete loan application ${loan.application_id}?`)) {
      setLoans(loans.filter(l => l.id !== loan.id));
      setToast({
        open: true,
        message: `Loan application ${loan.application_id} has been deleted successfully`,
        severity: "success",
      });
    }
  };

  const getStatusCounts = () => {
    const pending = loans.filter(loan => loan.status === "pending").length;
    const approved = loans.filter(loan => loan.status === "approved").length;
    const rejected = loans.filter(loan => loan.status === "rejected").length;
    return { pending, approved, rejected };
  };

  const statusCounts = getStatusCounts();
  const totalAmount = loans
    .filter(loan => loan.status === "approved")
    .reduce((sum, loan) => sum + loan.loan_amount_requested, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Loan Applications</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Loans</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">List</span>
        </nav>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Total Applications</h3>
          <p className="text-2xl font-bold text-blue-600">{loans.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Approved</h3>
          <p className="text-2xl font-bold text-green-600">{statusCounts.approved}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Total Approved Amount</h3>
          <p className="text-2xl font-bold text-green-600">${totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {loans.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <h2 className="text-xl text-gray-500 mb-2">No loan applications found</h2>
            <p className="text-gray-400">Add some loan applications to see them here.</p>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Total Applications: <span className="font-semibold">{loans.length}</span>
            </p>
            <button
              onClick={() => window.location.href = '/loans/add'}
              className="px-4 py-2 bg-[#53B175] text-white rounded-md hover:bg-[#449d63] transition-colors"
            >
              Add New Loan Application
            </button>
          </div>
          <DataTableMy columns={columns} data={loans} />
        </div>
      )}

      {selectedLoan && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Loan Application Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Application ID:</strong> {selectedLoan.application_id}</div>
            <div><strong>Customer:</strong> {selectedLoan.customer_name}</div>
            <div><strong>Email:</strong> {selectedLoan.customer_email}</div>
            <div><strong>Loan Amount:</strong> ${selectedLoan.loan_amount_requested.toLocaleString()}</div>
            <div><strong>Purpose:</strong> {selectedLoan.loan_purpose}</div>
            <div><strong>Requested Date:</strong> {new Date(selectedLoan.requested_date).toLocaleDateString()}</div>
            <div>
              <strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                selectedLoan.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : selectedLoan.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {selectedLoan.status.charAt(0).toUpperCase() + selectedLoan.status.slice(1)}
              </span>
            </div>
          </div>
          {selectedLoan.collateral && (
            <div className="mt-4">
              <strong>Collateral:</strong> {selectedLoan.collateral}
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setSelectedLoan(null)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Close Details
            </button>
            {selectedLoan.status === "pending" && (
              <>
                <button
                  onClick={() => {
                    handleApprove(selectedLoan);
                    setSelectedLoan(null);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    handleReject(selectedLoan);
                    setSelectedLoan(null);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Reject
                </button>
              </>
            )}
          </div>
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
