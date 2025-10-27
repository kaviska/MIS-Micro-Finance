"use client";
import DataTableMy from "@/app/components/DataTable";
import { useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PrintIcon from "@mui/icons-material/Print";
import { AlertColor } from "@mui/material";
import ToastMessage from "@/app/components/ToastMessage";

interface Repayment {
  id: number;
  repayment_id: string;
  loan_id: string;
  customer_name: string;
  amount: number;
  payment_date: string;
  payment_method: string;
  transaction_reference: string;
  notes: string;
  status: "completed" | "pending" | "failed" | "reversed";
}

export default function ViewRepayments() {
  // Sample repayment data for demonstration
  const sampleRepayments: Repayment[] = [
    {
      id: 1,
      repayment_id: "REP-1698234567890",
      loan_id: "LOAN-001",
      customer_name: "John Doe",
      amount: 1500,
      payment_date: "2024-10-15",
      payment_method: "Bank Transfer",
      transaction_reference: "TXN-123456789",
      notes: "Monthly installment payment",
      status: "completed"
    },
    {
      id: 2,
      repayment_id: "REP-1698234567891",
      loan_id: "LOAN-002",
      customer_name: "Jane Smith",
      amount: 2500,
      payment_date: "2024-10-20",
      payment_method: "Cash",
      transaction_reference: "TXN-123456790",
      notes: "Early payment with bonus",
      status: "completed"
    },
    {
      id: 3,
      repayment_id: "REP-1698234567892",
      loan_id: "LOAN-003",
      customer_name: "Michael Johnson",
      amount: 800,
      payment_date: "2024-10-22",
      payment_method: "Mobile Money",
      transaction_reference: "TXN-123456791",
      notes: "Regular payment",
      status: "pending"
    },
    {
      id: 4,
      repayment_id: "REP-1698234567893",
      loan_id: "LOAN-004",
      customer_name: "Sarah Williams",
      amount: 1200,
      payment_date: "2024-10-25",
      payment_method: "Check",
      transaction_reference: "CHK-987654321",
      notes: "Check payment",
      status: "failed"
    },
    {
      id: 5,
      repayment_id: "REP-1698234567894",
      loan_id: "LOAN-005",
      customer_name: "David Brown",
      amount: 3000,
      payment_date: "2024-10-26",
      payment_method: "Bank Transfer",
      transaction_reference: "TXN-123456792",
      notes: "Large payment towards principal",
      status: "completed"
    }
  ];

  const [repayments, setRepayments] = useState<Repayment[]>(sampleRepayments);
  const [selectedRepayment, setSelectedRepayment] = useState<Repayment | null>(null);
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
      name: "Repayment ID",
      selector: (row: Repayment) => row.repayment_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Loan ID",
      selector: (row: Repayment) => row.loan_id,
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row: Repayment) => row.customer_name,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: Repayment) => `$${row.amount.toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Payment Date",
      selector: (row: Repayment) => new Date(row.payment_date).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Payment Method",
      selector: (row: Repayment) => row.payment_method,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: Repayment) => row.status,
      sortable: true,
      cell: (row: Repayment) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.status === "completed"
              ? "bg-green-100 text-green-800"
              : row.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : row.status === "failed"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row: Repayment) => (
        <div className="flex gap-2 cursor-pointer">
          <button
            className="cursor-pointer"
            onClick={() => handleView(row)}
            title="View Repayment Details"
          >
            <RemoveRedEyeIcon fontSize="small" color="action" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handlePrint(row)}
            title="Print Receipt"
          >
            <PrintIcon fontSize="small" color="primary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleUpdate(row)}
            title="Update Repayment"
          >
            <UpdateIcon fontSize="small" color="primary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleDelete(row)}
            title="Delete Repayment"
          >
            <HighlightOffIcon fontSize="small" color="error" />
          </button>
        </div>
      ),
    },
  ];

  // Event handlers
  const handleView = (repayment: Repayment) => {
    setSelectedRepayment(repayment);
    setToast({
      open: true,
      message: `Viewing details for repayment ${repayment.repayment_id}`,
      severity: "info",
    });
  };

  const handlePrint = (repayment: Repayment) => {
    setToast({
      open: true,
      message: `Receipt printing for ${repayment.repayment_id} will be implemented soon`,
      severity: "info",
    });
  };

  const handleUpdate = (repayment: Repayment) => {
    setToast({
      open: true,
      message: `Update functionality for repayment ${repayment.repayment_id} will be implemented soon`,
      severity: "info",
    });
  };

  const handleDelete = (repayment: Repayment) => {
    if (window.confirm(`Are you sure you want to delete repayment ${repayment.repayment_id}?`)) {
      setRepayments(repayments.filter(r => r.id !== repayment.id));
      setToast({
        open: true,
        message: `Repayment ${repayment.repayment_id} has been deleted successfully`,
        severity: "success",
      });
    }
  };

  // Calculate statistics
  const getStatistics = () => {
    const completed = repayments.filter(r => r.status === "completed").length;
    const pending = repayments.filter(r => r.status === "pending").length;
    const failed = repayments.filter(r => r.status === "failed").length;
    const totalAmount = repayments
      .filter(r => r.status === "completed")
      .reduce((sum, r) => sum + r.amount, 0);
    
    return { completed, pending, failed, totalAmount };
  };

  const statistics = getStatistics();

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Repayment Records</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Repayments</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">List</span>
        </nav>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Total Repayments</h3>
          <p className="text-2xl font-bold text-blue-600">{repayments.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Completed</h3>
          <p className="text-2xl font-bold text-green-600">{statistics.completed}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">{statistics.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Total Amount</h3>
          <p className="text-2xl font-bold text-green-600">${statistics.totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Main Content */}
      {repayments.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <h2 className="text-xl text-gray-500 mb-2">No repayments found</h2>
            <p className="text-gray-400">Record some repayments to see them here.</p>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Total Repayments: <span className="font-semibold">{repayments.length}</span>
            </p>
            <button
              onClick={() => window.location.href = '/repayments/add'}
              className="px-4 py-2 bg-[#53B175] text-white rounded-md hover:bg-[#449d63] transition-colors"
            >
              Record New Repayment
            </button>
          </div>
          <DataTableMy columns={columns} data={repayments} />
        </div>
      )}

      {/* Detailed View Modal */}
      {selectedRepayment && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Repayment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Repayment ID:</strong> {selectedRepayment.repayment_id}</div>
            <div><strong>Loan ID:</strong> {selectedRepayment.loan_id}</div>
            <div><strong>Customer:</strong> {selectedRepayment.customer_name}</div>
            <div><strong>Amount:</strong> ${selectedRepayment.amount.toLocaleString()}</div>
            <div><strong>Payment Date:</strong> {new Date(selectedRepayment.payment_date).toLocaleDateString()}</div>
            <div><strong>Payment Method:</strong> {selectedRepayment.payment_method}</div>
            <div><strong>Transaction Reference:</strong> {selectedRepayment.transaction_reference}</div>
            <div>
              <strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                selectedRepayment.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : selectedRepayment.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : selectedRepayment.status === "failed"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}>
                {selectedRepayment.status.charAt(0).toUpperCase() + selectedRepayment.status.slice(1)}
              </span>
            </div>
          </div>
          {selectedRepayment.notes && (
            <div className="mt-4">
              <strong>Notes:</strong> {selectedRepayment.notes}
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setSelectedRepayment(null)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Close Details
            </button>
            <button
              onClick={() => handlePrint(selectedRepayment)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Print Receipt
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