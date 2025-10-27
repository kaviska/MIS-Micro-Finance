"use client";
import DataTableMy from "@/app/components/DataTable";
import { useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { AlertColor } from "@mui/material";
import ToastMessage from "@/app/components/ToastMessage";

interface Branch {
  id: number;
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
  status: "active" | "inactive" | "under-construction" | "temporarily-closed";
  operating_hours: string;
  services_offered: string;
  notes: string;
  employee_count?: number;
  monthly_transactions?: number;
}

export default function ViewBranches() {
  // Sample branch data for demonstration
  const sampleBranches: Branch[] = [
    {
      id: 1,
      branch_id: "BR-001",
      branch_name: "Downtown Main Branch",
      branch_code: "MAIN001",
      address: "123 Financial District, Suite 100",
      city: "Springfield",
      state: "Illinois",
      postal_code: "62701",
      country: "United States",
      phone: "2175551001",
      email: "main@microfinance.com",
      manager_name: "Sarah Johnson",
      manager_contact: "2175551011",
      established_date: "2020-01-15",
      status: "active",
      operating_hours: "Mon-Fri 9:00 AM - 5:00 PM, Sat 9:00 AM - 1:00 PM",
      services_offered: "Loan Services, Savings Accounts, Money Transfer, Financial Advisory",
      notes: "Main headquarters branch with full services",
      employee_count: 15,
      monthly_transactions: 1250
    },
    {
      id: 2,
      branch_id: "BR-002",
      branch_name: "North Community Branch",
      branch_code: "NORTH002",
      address: "456 North Main Street",
      city: "Springfield",
      state: "Illinois",
      postal_code: "62702",
      country: "United States",
      phone: "2175552001",
      email: "north@microfinance.com",
      manager_name: "Mike Davis",
      manager_contact: "2175552011",
      established_date: "2021-03-20",
      status: "active",
      operating_hours: "Mon-Fri 9:00 AM - 4:00 PM",
      services_offered: "Loan Services, Savings Accounts, Mobile Banking",
      notes: "Community-focused branch serving north Springfield",
      employee_count: 8,
      monthly_transactions: 890
    },
    {
      id: 3,
      branch_id: "BR-003",
      branch_name: "South Plaza Branch",
      branch_code: "SOUTH003",
      address: "789 South Plaza Drive",
      city: "Springfield",
      state: "Illinois",
      postal_code: "62703",
      country: "United States",
      phone: "2175553001",
      email: "south@microfinance.com",
      manager_name: "Lisa Anderson",
      manager_contact: "2175553011",
      established_date: "2021-08-10",
      status: "active",
      operating_hours: "Mon-Fri 8:30 AM - 5:30 PM",
      services_offered: "Loan Services, Savings Accounts, Insurance Services, ATM Services",
      notes: "Located in busy shopping plaza",
      employee_count: 10,
      monthly_transactions: 1050
    },
    {
      id: 4,
      branch_id: "BR-004",
      branch_name: "East Side Branch",
      branch_code: "EAST004",
      address: "321 East Market Street",
      city: "Springfield",
      state: "Illinois",
      postal_code: "62704",
      country: "United States",
      phone: "2175554001",
      email: "east@microfinance.com",
      manager_name: "James Wilson",
      manager_contact: "2175554011",
      established_date: "2022-11-05",
      status: "under-construction",
      operating_hours: "TBD",
      services_offered: "Full services planned upon completion",
      notes: "Currently under renovation, expected to open Q1 2025",
      employee_count: 0,
      monthly_transactions: 0
    },
    {
      id: 5,
      branch_id: "BR-005",
      branch_name: "West End Branch",
      branch_code: "WEST005",
      address: "654 West Commercial Avenue",
      city: "Springfield",
      state: "Illinois",
      postal_code: "62705",
      country: "United States",
      phone: "2175555001",
      email: "west@microfinance.com",
      manager_name: "Emma Brown",
      manager_contact: "2175555011",
      established_date: "2022-05-15",
      status: "temporarily-closed",
      operating_hours: "Temporarily closed for upgrades",
      services_offered: "Loan Services, Savings Accounts (when operational)",
      notes: "Closed for system upgrades, reopening soon",
      employee_count: 6,
      monthly_transactions: 0
    }
  ];

  const [branches, setBranches] = useState<Branch[]>(sampleBranches);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
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
      name: "Branch Code",
      selector: (row: Branch) => row.branch_code,
      sortable: true,
      width: "120px",
    },
    {
      name: "Branch Name",
      selector: (row: Branch) => row.branch_name,
      sortable: true,
    },
    {
      name: "City",
      selector: (row: Branch) => row.city,
      sortable: true,
    },
    {
      name: "Manager",
      selector: (row: Branch) => row.manager_name,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row: Branch) => row.phone,
      sortable: true,
      cell: (row: Branch) => (
        <div className="flex items-center">
          <PhoneIcon fontSize="small" className="mr-1 text-gray-400" />
          {row.phone}
        </div>
      ),
    },
    {
      name: "Employees",
      selector: (row: Branch) => row.employee_count?.toString() || "0",
      sortable: true,
      cell: (row: Branch) => (
        <span className="font-medium">{row.employee_count || 0}</span>
      ),
    },
    {
      name: "Monthly Transactions",
      selector: (row: Branch) => row.monthly_transactions?.toString() || "0",
      sortable: true,
      cell: (row: Branch) => (
        <span className="font-medium">{row.monthly_transactions?.toLocaleString() || "0"}</span>
      ),
    },
    {
      name: "Status",
      selector: (row: Branch) => row.status,
      sortable: true,
      cell: (row: Branch) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "active"
              ? "bg-green-100 text-green-800"
              : row.status === "inactive"
              ? "bg-red-100 text-red-800"
              : row.status === "under-construction"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-orange-100 text-orange-800"
          }`}
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1).replace('-', ' ')}
        </span>
      ),
    },
    {
      name: "Established",
      selector: (row: Branch) => new Date(row.established_date).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Branch) => (
        <div className="flex gap-2 cursor-pointer">
          <button
            className="cursor-pointer"
            onClick={() => handleView(row)}
            title="View Branch Details"
          >
            <RemoveRedEyeIcon fontSize="small" color="action" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleLocation(row)}
            title="View Location"
          >
            <LocationOnIcon fontSize="small" color="primary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleUpdate(row)}
            title="Update Branch"
          >
            <UpdateIcon fontSize="small" color="primary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleDelete(row)}
            title="Delete Branch"
          >
            <HighlightOffIcon fontSize="small" color="error" />
          </button>
        </div>
      ),
    },
  ];

  // Event handlers
  const handleView = (branch: Branch) => {
    setSelectedBranch(branch);
    setToast({
      open: true,
      message: `Viewing details for ${branch.branch_name}`,
      severity: "info",
    });
  };

  const handleLocation = (branch: Branch) => {
    setToast({
      open: true,
      message: `Location mapping for ${branch.branch_name} will be implemented soon`,
      severity: "info",
    });
  };

  const handleUpdate = (branch: Branch) => {
    setToast({
      open: true,
      message: `Update functionality for branch ${branch.branch_code} will be implemented soon`,
      severity: "info",
    });
  };

  const handleDelete = (branch: Branch) => {
    if (window.confirm(`Are you sure you want to delete branch ${branch.branch_name}?`)) {
      setBranches(branches.filter(b => b.id !== branch.id));
      setToast({
        open: true,
        message: `Branch ${branch.branch_name} has been deleted successfully`,
        severity: "success",
      });
    }
  };

  // Calculate statistics
  const getStatistics = () => {
    const activeBranches = branches.filter(b => b.status === "active").length;
    const totalEmployees = branches.reduce((sum, b) => sum + (b.employee_count || 0), 0);
    const totalTransactions = branches.reduce((sum, b) => sum + (b.monthly_transactions || 0), 0);
    const underConstruction = branches.filter(b => b.status === "under-construction").length;
    
    return { activeBranches, totalEmployees, totalTransactions, underConstruction };
  };

  const statistics = getStatistics();

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Branch Management</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Branches</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">List</span>
        </nav>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Total Branches</h3>
          <p className="text-2xl font-bold text-blue-600">{branches.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Active Branches</h3>
          <p className="text-2xl font-bold text-green-600">{statistics.activeBranches}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Total Employees</h3>
          <p className="text-2xl font-bold text-purple-600">{statistics.totalEmployees}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Monthly Transactions</h3>
          <p className="text-2xl font-bold text-orange-600">{statistics.totalTransactions.toLocaleString()}</p>
        </div>
      </div>

      {/* Main Content */}
      {branches.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <h2 className="text-xl text-gray-500 mb-2">No branches found</h2>
            <p className="text-gray-400">Add some branches to see them here.</p>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Total Branches: <span className="font-semibold">{branches.length}</span>
            </p>
            <button
              onClick={() => window.location.href = '/branches/add'}
              className="px-4 py-2 bg-[#53B175] text-white rounded-md hover:bg-[#449d63] transition-colors"
            >
              Add New Branch
            </button>
          </div>
          <DataTableMy columns={columns} data={branches} />
        </div>
      )}

      {/* Detailed View Modal */}
      {selectedBranch && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Branch Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Branch ID:</strong> {selectedBranch.branch_id}</div>
            <div><strong>Branch Name:</strong> {selectedBranch.branch_name}</div>
            <div><strong>Branch Code:</strong> {selectedBranch.branch_code}</div>
            <div><strong>Manager:</strong> {selectedBranch.manager_name}</div>
            <div><strong>Phone:</strong> {selectedBranch.phone}</div>
            <div><strong>Email:</strong> {selectedBranch.email}</div>
            <div><strong>Manager Contact:</strong> {selectedBranch.manager_contact}</div>
            <div><strong>Employees:</strong> {selectedBranch.employee_count || 0}</div>
            <div><strong>Monthly Transactions:</strong> {selectedBranch.monthly_transactions?.toLocaleString() || "0"}</div>
            <div><strong>Established:</strong> {new Date(selectedBranch.established_date).toLocaleDateString()}</div>
            <div><strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                selectedBranch.status === "active" ? "bg-green-100 text-green-800" :
                selectedBranch.status === "inactive" ? "bg-red-100 text-red-800" :
                selectedBranch.status === "under-construction" ? "bg-yellow-100 text-yellow-800" :
                "bg-orange-100 text-orange-800"
              }`}>
                {selectedBranch.status.charAt(0).toUpperCase() + selectedBranch.status.slice(1).replace('-', ' ')}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <strong>Address:</strong> {selectedBranch.address}, {selectedBranch.city}, {selectedBranch.state} {selectedBranch.postal_code}, {selectedBranch.country}
          </div>
          <div className="mt-4">
            <strong>Operating Hours:</strong> {selectedBranch.operating_hours}
          </div>
          {selectedBranch.services_offered && (
            <div className="mt-4">
              <strong>Services Offered:</strong> {selectedBranch.services_offered}
            </div>
          )}
          {selectedBranch.notes && (
            <div className="mt-4">
              <strong>Notes:</strong> {selectedBranch.notes}
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setSelectedBranch(null)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Close Details
            </button>
            <button
              onClick={() => handleLocation(selectedBranch)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              View on Map
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