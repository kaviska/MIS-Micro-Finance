"use client";
import DataTableMy from "@/app/components/DataTable";
import { useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EmailIcon from "@mui/icons-material/Email";
import { AlertColor } from "@mui/material";
import ToastMessage from "@/app/components/ToastMessage";

interface Employee {
  id: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  hire_date: string;
  branch_id: string;
  status: "active" | "inactive" | "on-leave";
  address: string;
  emergency_contact: string;
  notes: string;
}

export default function ViewEmployees() {
  // Sample employee data for demonstration
  const sampleEmployees: Employee[] = [
    {
      id: 1,
      employee_id: "EMP-001",
      first_name: "Sarah",
      last_name: "Johnson",
      email: "sarah.johnson@company.com",
      phone: "1234567890",
      position: "Branch Manager",
      department: "Operations",
      salary: 75000,
      hire_date: "2022-01-15",
      branch_id: "BR-001",
      status: "active",
      address: "123 Main St, Springfield, IL",
      emergency_contact: "John Johnson - 9876543210",
      notes: "Excellent leadership skills"
    },
    {
      id: 2,
      employee_id: "EMP-002",
      first_name: "Mike",
      last_name: "Davis",
      email: "mike.davis@company.com",
      phone: "0987654321",
      position: "Loan Officer",
      department: "Lending",
      salary: 55000,
      hire_date: "2022-03-20",
      branch_id: "BR-001",
      status: "active",
      address: "456 Oak Ave, Springfield, IL",
      emergency_contact: "Lisa Davis - 5555555555",
      notes: "Top performer in loan approvals"
    },
    {
      id: 3,
      employee_id: "EMP-003",
      first_name: "Lisa",
      last_name: "Anderson",
      email: "lisa.anderson@company.com",
      phone: "5555555555",
      position: "Accountant",
      department: "Finance",
      salary: 60000,
      hire_date: "2021-09-10",
      branch_id: "BR-001",
      status: "active",
      address: "789 Pine St, Springfield, IL",
      emergency_contact: "Robert Anderson - 7777777777",
      notes: "CPA certified, handles all financial reporting"
    },
    {
      id: 4,
      employee_id: "EMP-004",
      first_name: "James",
      last_name: "Wilson",
      email: "james.wilson@company.com",
      phone: "7777777777",
      position: "Customer Service Representative",
      department: "Customer Service",
      salary: 40000,
      hire_date: "2023-02-01",
      branch_id: "BR-002",
      status: "on-leave",
      address: "321 Elm Dr, Springfield, IL",
      emergency_contact: "Mary Wilson - 2222222222",
      notes: "Currently on paternity leave"
    },
    {
      id: 5,
      employee_id: "EMP-005",
      first_name: "Emma",
      last_name: "Brown",
      email: "emma.brown@company.com",
      phone: "8888888888",
      position: "Credit Analyst",
      department: "Lending",
      salary: 52000,
      hire_date: "2022-11-15",
      branch_id: "BR-001",
      status: "active",
      address: "654 Maple Ln, Springfield, IL",
      emergency_contact: "David Brown - 3333333333",
      notes: "Expert in risk assessment"
    }
  ];

  const [employees, setEmployees] = useState<Employee[]>(sampleEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
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
      name: "Employee ID",
      selector: (row: Employee) => row.employee_id,
      sortable: true,
      width: "120px",
    },
    {
      name: "Full Name",
      selector: (row: Employee) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Position",
      selector: (row: Employee) => row.position,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row: Employee) => row.department,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: Employee) => row.email,
      sortable: true,
      cell: (row: Employee) => (
        <div className="truncate max-w-xs" title={row.email}>
          {row.email}
        </div>
      ),
    },
    {
      name: "Phone",
      selector: (row: Employee) => row.phone,
      sortable: true,
    },
    {
      name: "Salary",
      selector: (row: Employee) => `$${row.salary.toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Hire Date",
      selector: (row: Employee) => new Date(row.hire_date).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: Employee) => row.status,
      sortable: true,
      cell: (row: Employee) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "active"
              ? "bg-green-100 text-green-800"
              : row.status === "inactive"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1).replace('-', ' ')}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row: Employee) => (
        <div className="flex gap-2 cursor-pointer">
          <button
            className="cursor-pointer"
            onClick={() => handleView(row)}
            title="View Employee Details"
          >
            <RemoveRedEyeIcon fontSize="small" color="action" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleEmail(row)}
            title="Send Email"
          >
            <EmailIcon fontSize="small" color="primary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleUpdate(row)}
            title="Update Employee"
          >
            <UpdateIcon fontSize="small" color="primary" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleDelete(row)}
            title="Delete Employee"
          >
            <HighlightOffIcon fontSize="small" color="error" />
          </button>
        </div>
      ),
    },
  ];

  // Event handlers
  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
    setToast({
      open: true,
      message: `Viewing details for ${employee.first_name} ${employee.last_name}`,
      severity: "info",
    });
  };

  const handleEmail = (employee: Employee) => {
    setToast({
      open: true,
      message: `Email functionality for ${employee.first_name} ${employee.last_name} will be implemented soon`,
      severity: "info",
    });
  };

  const handleUpdate = (employee: Employee) => {
    setToast({
      open: true,
      message: `Update functionality for employee ${employee.employee_id} will be implemented soon`,
      severity: "info",
    });
  };

  const handleDelete = (employee: Employee) => {
    if (window.confirm(`Are you sure you want to delete employee ${employee.first_name} ${employee.last_name}?`)) {
      setEmployees(employees.filter(e => e.id !== employee.id));
      setToast({
        open: true,
        message: `Employee ${employee.first_name} ${employee.last_name} has been deleted successfully`,
        severity: "success",
      });
    }
  };

  // Calculate statistics
  const getStatistics = () => {
    const activeEmployees = employees.filter(e => e.status === "active").length;
    const onLeave = employees.filter(e => e.status === "on-leave").length;
    const totalSalary = employees
      .filter(e => e.status === "active")
      .reduce((sum, e) => sum + e.salary, 0);
    const avgSalary = activeEmployees > 0 ? totalSalary / activeEmployees : 0;
    
    return { activeEmployees, onLeave, totalSalary, avgSalary };
  };

  const statistics = getStatistics();

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
        <nav className="text-sm text-gray-600 mt-2">
          <span className="hover:text-blue-600 cursor-pointer">Employees</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">List</span>
        </nav>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Total Employees</h3>
          <p className="text-2xl font-bold text-blue-600">{employees.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Active</h3>
          <p className="text-2xl font-bold text-green-600">{statistics.activeEmployees}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">On Leave</h3>
          <p className="text-2xl font-bold text-yellow-600">{statistics.onLeave}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Avg. Salary</h3>
          <p className="text-2xl font-bold text-purple-600">${Math.round(statistics.avgSalary).toLocaleString()}</p>
        </div>
      </div>

      {/* Main Content */}
      {employees.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <h2 className="text-xl text-gray-500 mb-2">No employees found</h2>
            <p className="text-gray-400">Add some employees to see them here.</p>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Total Employees: <span className="font-semibold">{employees.length}</span>
            </p>
            <button
              onClick={() => window.location.href = '/employees/add'}
              className="px-4 py-2 bg-[#53B175] text-white rounded-md hover:bg-[#449d63] transition-colors"
            >
              Add New Employee
            </button>
          </div>
          <DataTableMy columns={columns} data={employees} />
        </div>
      )}

      {/* Detailed View Modal */}
      {selectedEmployee && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Employee Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Employee ID:</strong> {selectedEmployee.employee_id}</div>
            <div><strong>Name:</strong> {selectedEmployee.first_name} {selectedEmployee.last_name}</div>
            <div><strong>Position:</strong> {selectedEmployee.position}</div>
            <div><strong>Department:</strong> {selectedEmployee.department}</div>
            <div><strong>Email:</strong> {selectedEmployee.email}</div>
            <div><strong>Phone:</strong> {selectedEmployee.phone}</div>
            <div><strong>Salary:</strong> ${selectedEmployee.salary.toLocaleString()}</div>
            <div><strong>Hire Date:</strong> {new Date(selectedEmployee.hire_date).toLocaleDateString()}</div>
            <div><strong>Branch ID:</strong> {selectedEmployee.branch_id}</div>
            <div><strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                selectedEmployee.status === "active" ? "bg-green-100 text-green-800" :
                selectedEmployee.status === "inactive" ? "bg-red-100 text-red-800" :
                "bg-yellow-100 text-yellow-800"
              }`}>
                {selectedEmployee.status.charAt(0).toUpperCase() + selectedEmployee.status.slice(1).replace('-', ' ')}
              </span>
            </div>
          </div>
          {selectedEmployee.address && (
            <div className="mt-4">
              <strong>Address:</strong> {selectedEmployee.address}
            </div>
          )}
          {selectedEmployee.emergency_contact && (
            <div className="mt-4">
              <strong>Emergency Contact:</strong> {selectedEmployee.emergency_contact}
            </div>
          )}
          {selectedEmployee.notes && (
            <div className="mt-4">
              <strong>Notes:</strong> {selectedEmployee.notes}
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setSelectedEmployee(null)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Close Details
            </button>
            <button
              onClick={() => handleEmail(selectedEmployee)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Send Email
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