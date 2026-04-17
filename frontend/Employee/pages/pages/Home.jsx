import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../src/components/common/LoadingSpinner";
import { formatCurrency } from "../../src/utils/formatting";
import "../../src/styles/theme.css";
import "./Home.css";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const result = await axios.get("http://localhost:8080/employee");
      setEmployees(result.data);
    } catch (error) {
      console.error("Error loading employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await axios.delete(`http://localhost:8080/employee/${id}`);
        loadUsers();
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee. Please try again.");
      }
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.empDept.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.empId.toString().includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="container">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <LoadingSpinner size="large" message="Loading employees..." />
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4">
      <div className="py-4">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-md-6">
            <h2 className="page-title">
              <i className="fas fa-users me-2"></i>
              Employee Management
            </h2>
            <p className="text-muted">Manage your organization's employees</p>
          </div>
          <div className="col-md-6 text-end">
            <Link className="btn btn-primary btn-lg shadow-sm" to="/adduser">
              <i className="fas fa-plus me-2"></i>
              Add New Employee
            </Link>
          </div>
        </div>

        {/* Search Section */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="search-container">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search employees by name, department, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="btn btn-link search-clear"
                  onClick={() => setSearchTerm("")}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>
          <div className="col-md-6 text-end">
            <span className="employee-count">
              {filteredEmployees.length} of {employees.length} employees
            </span>
          </div>
        </div>

        {/* Employees Table */}
        <div className="card shadow-sm">
          <div className="card-body p-0">
            {filteredEmployees.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-users fa-3x text-muted mb-3"></i>
                <h4>No employees found</h4>
                <p className="text-muted">
                  {searchTerm ? "Try adjusting your search criteria" : "Get started by adding your first employee"}
                </p>
                {!searchTerm && (
                  <Link className="btn btn-primary" to="/adduser">
                    <i className="fas fa-plus me-2"></i>
                    Add Employee
                  </Link>
                )}
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-header">
                    <tr>
                      <th scope="col">
                        <i className="fas fa-id-badge me-2"></i>ID
                      </th>
                      <th scope="col">
                        <i className="fas fa-user me-2"></i>Name
                      </th>
                      <th scope="col">
                        <i className="fas fa-dollar-sign me-2"></i>Salary
                      </th>
                      <th scope="col">
                        <i className="fas fa-building me-2"></i>Department
                      </th>
                      <th scope="col" className="text-center">
                        <i className="fas fa-cogs me-2"></i>Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee, index) => (
                      <tr key={employee.empId} className="employee-row">
                        <td className="employee-id">#{employee.empId}</td>
                        <td className="employee-name">
                          <div className="d-flex align-items-center">
                            <div className="employee-avatar">
                              {employee.empName.charAt(0).toUpperCase()}
                            </div>
                            <span className="ms-2">{employee.empName}</span>
                          </div>
                        </td>
                        <td className="employee-salary">
                          {formatCurrency(employee.empSal)}
                        </td>
                        <td className="employee-department">
                          <span className="department-badge">
                            {employee.empDept}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="action-buttons">
                            <Link
                              className="btn btn-outline-info btn-sm me-1"
                              to={`/viewuser/${employee.empId}`}
                              title="View Details"
                            >
                              <i className="fas fa-eye"></i>
                            </Link>
                            <Link
                              className="btn btn-outline-primary btn-sm me-1"
                              to={`/edituser/${employee.empId}`}
                              title="Edit Employee"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => deleteUser(employee.empId, employee.empName)}
                              title="Delete Employee"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        {employees.length > 0 && (
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="stat-card">
                <div className="stat-icon bg-primary">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-content">
                  <h3>{employees.length}</h3>
                  <p>Total Employees</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card">
                <div className="stat-icon bg-success">
                  <i className="fas fa-building"></i>
                </div>
                <div className="stat-content">
                  <h3>{new Set(employees.map(emp => emp.empDept)).size}</h3>
                  <p>Departments</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card">
                <div className="stat-icon bg-info">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="stat-content">
                  <h3>
                    {formatCurrency(
                      employees.reduce((sum, emp) => sum + parseFloat(emp.empSal || 0), 0) / employees.length
                    )}
                  </h3>
                  <p>Average Salary</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}