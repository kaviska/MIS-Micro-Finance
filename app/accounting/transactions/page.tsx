"use client";
import DataTableMy from "@/app/components/DataTable";
import { useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { AlertColor } from "@mui/material";
import ToastMessage from "@/app/components/ToastMessage";

interface Transaction {
  id: number;
  transaction_id: string;
  date: string;
  type: "debit" | "credit";
  account: string;
  description: string;
  amount: number;
  reference: string;
  status: "completed" | "pending" | "failed";
  created_by: string;
}

export default function AccountingTransactions() {
  // Sample transaction data for demonstration
  const sampleTransactions: Transaction[] = [
    {
      id: 1,
      transaction_id: "TXN-001-2024",
      date: "2024-10-27",
      type: "credit",
      account: "Loan Disbursement",
      description: "Loan disbursed to John Doe - LOAN-001",
      amount: 15000,
      reference: "LOAN-001",
      status: "completed",
      created_by: "Sarah Johnson"
    },
    {
      id: 2,
      transaction_id: "TXN-002-2024",
      date: "2024-10-27",
      type: "debit",
      account: "Cash Account",
      description: "Loan disbursement to customer",
      amount: 15000,
      reference: "LOAN-001",
      status: "completed",
      created_by: "Sarah Johnson"
    },
    {
      id: 3,
      transaction_id: "TXN-003-2024",
      date: "2024-10-26",
      type: "debit",
      account: "Cash Account",
      description: "Repayment received from Jane Smith",
      amount: 2500,
      reference: "REP-1698234567891",
      status: "completed",
      created_by: "Mike Davis"
    },
    {
      id: 4,
      transaction_id: "TXN-004-2024",
      date: "2024-10-26",
      type: "credit",
      account: "Loan Repayment",
      description: "Loan repayment - LOAN-002",
      amount: 2500,
      reference: "REP-1698234567891",
      status: "completed",
      created_by: "Mike Davis"
    },
    {
      id: 5,
      transaction_id: "TXN-005-2024",
      date: "2024-10-25",
      type: "debit",
      account: "Operating Expenses",
      description: "Office rent payment",
      amount: 3200,
      reference: "RENT-OCT-2024",
      status: "completed",
      created_by: "Lisa Anderson"
    },
    {
      id: 6,
      transaction_id: "TXN-006-2024",
      date: "2024-10-25",
      type: "credit",
      account: "Bank Account",
      description: "Rent payment to landlord",
      amount: 3200,
      reference: "RENT-OCT-2024",
      status: "completed",
      created_by: "Lisa Anderson"
    }
  ];

  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
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
      name: "Transaction ID",
      selector: (row: Transaction) => row.transaction_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Date",
      selector: (row: Transaction) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Type",
      selector: (row: Transaction) => row.type,
      sortable: true,
      cell: (row: Transaction) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.type === "credit"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.type.toUpperCase()}
        </span>
      ),
    },
    {
      name: "Account",
      selector: (row: Transaction) => row.account,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: Transaction) => row.description,
      sortable: true,
      cell: (row: Transaction) => (
        <div className="truncate max-w-xs" title={row.description}>
          {row.description}
        </div>
      ),
    },
    {
      name: "Amount",
      selector: (row: Transaction) => `$${row.amount.toLocaleString()}`,
      sortable: true,
      cell: (row: Transaction) => (
        <span className={`font-medium ${
          row.type === "credit" ? "text-green-600" : "text-red-600"
        }`}>
          {row.type === "credit" ? "+" : "-"}${row.amount.toLocaleString()}
        </span>
      ),
    },
    {
      name: "Status",
      selector: (row: Transaction) => row.status,
      sortable: true,
      cell: (row: Transaction) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "completed"
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
      name: "Created By",
      selector: (row: Transaction) => row.created_by,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Transaction) => (
        <div className="flex gap-2 cursor-pointer">
          <button
            className="cursor-pointer"
            onClick={() => handleView(row)}
            title="View Transaction Details"
          >
            <RemoveRedEyeIcon fontSize="small" color="action" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleReceipt(row)}
            title="Generate Receipt"
          >
            <ReceiptIcon fontSize="small" color="primary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleUpdate(row)}
            title="Update Transaction"
          >
            <UpdateIcon fontSize="small" color="primary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleDelete(row)}
            title="Delete Transaction"
          >
            <HighlightOffIcon fontSize="small" color="error" />
          </button>
        </div>
      ),
    },
  ];

  // Event handlers
  const handleView = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setToast({
      open: true,
      message: `Viewing details for transaction ${transaction.transaction_id}`,
      severity: "info",
    });
  };

  const handleReceipt = (transaction: Transaction) => {
    setToast({
      open: true,
      message: `Receipt generation for ${transaction.transaction_id} will be implemented soon`,
      severity: "info",
    });
  };

  const handleUpdate = (transaction: Transaction) => {
    setToast({
      open: true,
      message: `Update functionality for transaction ${transaction.transaction_id} will be implemented soon`,
      severity: "info",
    });
  };

  const handleDelete = (transaction: Transaction) => {
    if (window.confirm(`Are you sure you want to delete transaction ${transaction.transaction_id}?`)) {
      setTransactions(transactions.filter(t => t.id !== transaction.id));
      setToast({
        open: true,
        message: `Transaction ${transaction.transaction_id} has been deleted successfully`,
        severity: "success",
      });
    }
  };

  // Calculate statistics
  const getStatistics = () => {
    const totalCredits = transactions
      .filter(t => t.type === "credit" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalDebits = transactions
      .filter(t => t.type === "debit" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalCredits - totalDebits;
    const pendingCount = transactions.filter(t => t.status === "pending").length;
    
    return { totalCredits, totalDebits, balance, pendingCount };
  };

  const statistics = getStatistics();

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Accounting Transactions</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Accounting</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Transactions</span>
        </nav>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Total Credits</h3>
          <p className="text-2xl font-bold text-green-600">${statistics.totalCredits.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Total Debits</h3>
          <p className="text-2xl font-bold text-red-600">${statistics.totalDebits.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Net Balance</h3>
          <p className={`text-2xl font-bold ${statistics.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${Math.abs(statistics.balance).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">{statistics.pendingCount}</p>
        </div>
      </div>

      {/* Main Content */}
      {transactions.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <h2 className="text-xl text-gray-500 mb-2">No transactions found</h2>
            <p className="text-gray-400">Transaction records will appear here.</p>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Total Transactions: <span className="font-semibold">{transactions.length}</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setToast({open: true, message: "Export functionality will be implemented soon", severity: "info"})}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Export to Excel
              </button>
              <button
                onClick={() => setToast({open: true, message: "Manual transaction entry will be implemented soon", severity: "info"})}
                className="px-4 py-2 bg-[#53B175] text-white rounded-md hover:bg-[#449d63] transition-colors"
              >
                Add Manual Transaction
              </button>
            </div>
          </div>
          <DataTableMy columns={columns} data={transactions} />
        </div>
      )}

      {/* Detailed View Modal */}
      {selectedTransaction && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Transaction ID:</strong> {selectedTransaction.transaction_id}</div>
            <div><strong>Date:</strong> {new Date(selectedTransaction.date).toLocaleDateString()}</div>
            <div><strong>Type:</strong> 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                selectedTransaction.type === "credit" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
                {selectedTransaction.type.toUpperCase()}
              </span>
            </div>
            <div><strong>Account:</strong> {selectedTransaction.account}</div>
            <div><strong>Amount:</strong> 
              <span className={`ml-1 font-medium ${
                selectedTransaction.type === "credit" ? "text-green-600" : "text-red-600"
              }`}>
                {selectedTransaction.type === "credit" ? "+" : "-"}${selectedTransaction.amount.toLocaleString()}
              </span>
            </div>
            <div><strong>Reference:</strong> {selectedTransaction.reference}</div>
            <div><strong>Status:</strong> {selectedTransaction.status}</div>
            <div><strong>Created By:</strong> {selectedTransaction.created_by}</div>
          </div>
          <div className="mt-4">
            <strong>Description:</strong> {selectedTransaction.description}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setSelectedTransaction(null)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Close Details
            </button>
            <button
              onClick={() => handleReceipt(selectedTransaction)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Generate Receipt
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