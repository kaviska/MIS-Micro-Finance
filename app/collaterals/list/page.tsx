"use client";
import DataTableMy from "@/app/components/DataTable";
import { useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { AlertColor } from "@mui/material";
import ToastMessage from "@/app/components/ToastMessage";

interface Collateral {
  id: number;
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

export default function ViewCollaterals() {
  // Sample collateral data for demonstration
  const sampleCollaterals: Collateral[] = [
    {
      id: 1,
      collateral_id: "COL-1698234567890",
      loan_id: "LOAN-001",
      collateral_type: "Real Estate",
      description: "3-bedroom house with 2-car garage",
      estimated_value: 250000,
      current_value: 245000,
      location: "123 Main Street, Springfield, IL",
      ownership_documents: "Property Deed #PD123456",
      insurance_details: "Home Insurance Policy #HI789012",
      condition_status: "Excellent",
      valuation_date: "2024-10-15",
      notes: "Recently renovated kitchen and bathrooms"
    },
    {
      id: 2,
      collateral_id: "COL-1698234567891",
      loan_id: "LOAN-002",
      collateral_type: "Vehicle",
      description: "2020 Honda Civic EX Sedan",
      estimated_value: 22000,
      current_value: 20500,
      location: "Customer's residence",
      ownership_documents: "Vehicle Title #VT456789",
      insurance_details: "Auto Insurance Policy #AI345678",
      condition_status: "Good",
      valuation_date: "2024-10-20",
      notes: "Low mileage, well-maintained"
    },
    {
      id: 3,
      collateral_id: "COL-1698234567892",
      loan_id: "LOAN-003",
      collateral_type: "Machinery",
      description: "Industrial printing press equipment",
      estimated_value: 85000,
      current_value: 78000,
      location: "Johnson Manufacturing Plant",
      ownership_documents: "Equipment Certificate #EC987654",
      insurance_details: "Commercial Equipment Insurance #CEI123789",
      condition_status: "Good",
      valuation_date: "2024-10-22",
      notes: "Regular maintenance performed"
    },
    {
      id: 4,
      collateral_id: "COL-1698234567893",
      loan_id: "LOAN-004",
      collateral_type: "Jewelry",
      description: "Diamond engagement ring and wedding set",
      estimated_value: 15000,
      current_value: 14200,
      location: "Safe deposit box #SDB456",
      ownership_documents: "Jewelry Appraisal #JA789123",
      insurance_details: "Jewelry Insurance Policy #JIP456789",
      condition_status: "Excellent",
      valuation_date: "2024-10-25",
      notes: "GIA certified diamonds"
    },
    {
      id: 5,
      collateral_id: "COL-1698234567894",
      loan_id: "LOAN-005",
      collateral_type: "Equipment",
      description: "Commercial kitchen equipment set",
      estimated_value: 45000,
      current_value: 42000,
      location: "Brown's Restaurant, 789 Oak St",
      ownership_documents: "Equipment Invoice #EI654321",
      insurance_details: "Business Equipment Insurance #BEI987654",
      condition_status: "Good",
      valuation_date: "2024-10-26",
      notes: "Professional grade equipment"
    }
  ];

  const [collaterals, setCollaterals] = useState<Collateral[]>(sampleCollaterals);
  const [selectedCollateral, setSelectedCollateral] = useState<Collateral | null>(null);
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
      name: "Collateral ID",
      selector: (row: Collateral) => row.collateral_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Loan ID",
      selector: (row: Collateral) => row.loan_id,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row: Collateral) => row.collateral_type,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: Collateral) => row.description,
      sortable: true,
      cell: (row: Collateral) => (
        <div className="truncate max-w-xs" title={row.description}>
          {row.description}
        </div>
      ),
    },
    {
      name: "Estimated Value",
      selector: (row: Collateral) => `$${row.estimated_value.toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Current Value",
      selector: (row: Collateral) => `$${row.current_value.toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Condition",
      selector: (row: Collateral) => row.condition_status,
      sortable: true,
      cell: (row: Collateral) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.condition_status === "Excellent"
              ? "bg-green-100 text-green-800"
              : row.condition_status === "Good"
              ? "bg-blue-100 text-blue-800"
              : row.condition_status === "Fair"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.condition_status}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row: Collateral) => (
        <div className="flex gap-2 cursor-pointer">
          <button
            className="cursor-pointer"
            onClick={() => handleView(row)}
            title="View Collateral Details"
          >
            <RemoveRedEyeIcon fontSize="small" color="action" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleValuation(row)}
            title="Revaluate Collateral"
          >
            <AssessmentIcon fontSize="small" color="primary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleUpdate(row)}
            title="Update Collateral"
          >
            <UpdateIcon fontSize="small" color="primary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleDelete(row)}
            title="Delete Collateral"
          >
            <HighlightOffIcon fontSize="small" color="error" />
          </button>
        </div>
      ),
    },
  ];

  // Event handlers
  const handleView = (collateral: Collateral) => {
    setSelectedCollateral(collateral);
    setToast({
      open: true,
      message: `Viewing details for collateral ${collateral.collateral_id}`,
      severity: "info",
    });
  };

  const handleValuation = (collateral: Collateral) => {
    setToast({
      open: true,
      message: `Revaluation functionality for ${collateral.collateral_id} will be implemented soon`,
      severity: "info",
    });
  };

  const handleUpdate = (collateral: Collateral) => {
    setToast({
      open: true,
      message: `Update functionality for collateral ${collateral.collateral_id} will be implemented soon`,
      severity: "info",
    });
  };

  const handleDelete = (collateral: Collateral) => {
    if (window.confirm(`Are you sure you want to delete collateral ${collateral.collateral_id}?`)) {
      setCollaterals(collaterals.filter(c => c.id !== collateral.id));
      setToast({
        open: true,
        message: `Collateral ${collateral.collateral_id} has been deleted successfully`,
        severity: "success",
      });
    }
  };

  // Calculate statistics
  const getStatistics = () => {
    const totalEstimatedValue = collaterals.reduce((sum, c) => sum + c.estimated_value, 0);
    const totalCurrentValue = collaterals.reduce((sum, c) => sum + c.current_value, 0);
    const excellentCondition = collaterals.filter(c => c.condition_status === "Excellent").length;
    const depreciation = totalEstimatedValue - totalCurrentValue;
    
    return { totalEstimatedValue, totalCurrentValue, excellentCondition, depreciation };
  };

  const statistics = getStatistics();

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Collateral Management</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Collaterals</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">List</span>
        </nav>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Total Collaterals</h3>
          <p className="text-2xl font-bold text-blue-600">{collaterals.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Estimated Value</h3>
          <p className="text-2xl font-bold text-green-600">${statistics.totalEstimatedValue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Current Value</h3>
          <p className="text-2xl font-bold text-blue-600">${statistics.totalCurrentValue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Excellent Condition</h3>
          <p className="text-2xl font-bold text-purple-600">{statistics.excellentCondition}</p>
        </div>
      </div>

      {/* Main Content */}
      {collaterals.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <h2 className="text-xl text-gray-500 mb-2">No collaterals found</h2>
            <p className="text-gray-400">Add some collaterals to see them here.</p>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Total Collaterals: <span className="font-semibold">{collaterals.length}</span>
            </p>
            <button
              onClick={() => window.location.href = '/collaterals/add'}
              className="px-4 py-2 bg-[#53B175] text-white rounded-md hover:bg-[#449d63] transition-colors"
            >
              Add New Collateral
            </button>
          </div>
          <DataTableMy columns={columns} data={collaterals} />
        </div>
      )}

      {/* Detailed View Modal */}
      {selectedCollateral && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Collateral Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Collateral ID:</strong> {selectedCollateral.collateral_id}</div>
            <div><strong>Loan ID:</strong> {selectedCollateral.loan_id}</div>
            <div><strong>Type:</strong> {selectedCollateral.collateral_type}</div>
            <div><strong>Estimated Value:</strong> ${selectedCollateral.estimated_value.toLocaleString()}</div>
            <div><strong>Current Value:</strong> ${selectedCollateral.current_value.toLocaleString()}</div>
            <div><strong>Location:</strong> {selectedCollateral.location}</div>
            <div><strong>Ownership Documents:</strong> {selectedCollateral.ownership_documents}</div>
            <div><strong>Insurance:</strong> {selectedCollateral.insurance_details}</div>
            <div><strong>Condition:</strong> {selectedCollateral.condition_status}</div>
            <div><strong>Valuation Date:</strong> {new Date(selectedCollateral.valuation_date).toLocaleDateString()}</div>
          </div>
          <div className="mt-4">
            <strong>Description:</strong> {selectedCollateral.description}
          </div>
          {selectedCollateral.notes && (
            <div className="mt-4">
              <strong>Notes:</strong> {selectedCollateral.notes}
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setSelectedCollateral(null)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Close Details
            </button>
            <button
              onClick={() => handleValuation(selectedCollateral)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Revaluate
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