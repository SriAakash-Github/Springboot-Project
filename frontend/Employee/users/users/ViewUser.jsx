import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [employee, setEmployee] = useState({
    empName: "",
    empSal: "",
    empDept: ""
  });

  const { empId } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/employee/${empId}`);
    setEmployee(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Employee Details</h2>

          <div className="card">
            <div className="card-header">
              Details of Employee ID: {employee.empId}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b> {employee.empName}
                </li>
                <li className="list-group-item">
                  <b>Salary:</b> {employee.empSal}
                </li>
                <li className="list-group-item">
                  <b>Department:</b> {employee.empDept}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}