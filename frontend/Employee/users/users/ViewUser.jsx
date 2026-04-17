import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../src/components/common/LoadingSpinner";
import { formatCurrency } from "../../src/utils/formatting";
import "./ViewUser.css";

export default function ViewUser() {
  const [employee, setEmployee] = useState({
    empName: "",
    empSal: "",
    empDept: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { empId } = useParams();

  useEffect(() => {
    loadUser();
  }, [empId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await axios.get(`http://localhost:8080/employee/${empId}`);
      setEmployee(result.data);
    } catch (error) {
      console.error("Error loading employee:", error);
      setError("Failed to load employee details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <LoadingSpinner size="large" message="Loading employee details..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-danger text-center">
              <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
              <h4>Error Loading Employee</h4>
              <p>{error}</p>
              <button className="btn btn-primary" onClick={loadUser}>
                <i className="fas fa-redo me-2"></i>
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  <i className="fas fa-home me-1"></i>
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Employee Details
              </li>
            </ol>
          </nav>

          {/* Employee Details Card */}
          <div className="employee-detail-card">
            <div className="card-header-custom">
              <div className="employee-header">
                <div className="employee-avatar-large">
                  {employee.empName.charAt(0).toUpperCase()}
                </div>
                <div className="employee-info">
                  <h2 className="employee-name">{employee.empName}</h2>
                  <p className="employee-id">Employee ID: #{employee.empId}</p>
                </div>
              </div>
            </div>

            <div className="card-body-custom">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="detail-item">
                    <div className="detail-icon">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="detail-content">
                      <label className="detail-label">Full Name</label>
                      <div className="detail-value">{employee.empName}</div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="detail-item">
                    <div className="detail-icon salary-icon">
                      <i className="fas fa-dollar-sign"></i>
                    </div>
                    <div className="detail-content">
                      <label className="detail-label">Salary</label>
                      <div className="detail-value salary-value">
                        {formatCurrency(employee.empSal)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="detail-item">
                    <div className="detail-icon department-icon">
                      <i className="fas fa-building"></i>
                    </div>
                    <div className="detail-content">
                      <label className="detail-label">Department</label>
                      <div className="detail-value">
                        <span className="department-badge-large">
                          {employee.empDept}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="detail-item">
                    <div className="detail-icon">
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                    <div className="detail-content">
                      <label className="detail-label">Joined</label>
                      <div className="detail-value">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-section">
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <Link 
                      className="btn btn-primary btn-lg w-100 action-btn"
                      to={`/edituser/${employee.empId}`}
                    >
                      <i className="fas fa-edit me-2"></i>
                      Edit Employee
                    </Link>
                  </div>
                  <div className="col-md-6 mb-2">
                    <Link 
                      className="btn btn-outline-secondary btn-lg w-100 action-btn"
                      to="/"
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Back to Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="info-card">
                <div className="info-icon bg-primary">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="info-content">
                  <h6>Performance</h6>
                  <p className="text-muted">Excellent</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-card">
                <div className="info-icon bg-success">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="info-content">
                  <h6>Attendance</h6>
                  <p className="text-muted">98.5%</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-card">
                <div className="info-icon bg-info">
                  <i className="fas fa-tasks"></i>
                </div>
                <div className="info-content">
                  <h6>Projects</h6>
                  <p className="text-muted">12 Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}