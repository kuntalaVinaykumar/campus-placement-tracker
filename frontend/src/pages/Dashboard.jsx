import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    companyName: "",
    role: "",
    status: "Applied",
    salary: "",
    location: "",
  });

  // FETCH APPLICATIONS
  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications");
      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // UPDATE STATUS
  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/applications/${id}`, { status: newStatus });
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD APPLICATION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/applications", form);
      fetchApplications();

      setForm({
        companyName: "",
        role: "",
        status: "Applied",
        salary: "",
        location: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE APPLICATION
  const handleDelete = async (id) => {
    try {
      await API.delete(`/applications/${id}`);
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <h2>📊 Placement Dashboard</h2>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* ADD FORM */}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <input
            name="companyName"
            placeholder="Company"
            value={form.companyName}
            onChange={handleChange}
            required
          />

          <input
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            required
          />

          <input
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <select name="status" value={form.status} onChange={handleChange}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <button type="submit">Add Application</button>
        </form>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Salary</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.companyName}</td>
                <td>{app.role}</td>

                <td>
                  <select
                    value={app.status}
                    onChange={(e) =>
                      handleStatusChange(app._id, e.target.value)
                    }
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                  </select>
                </td>

                <td>{app.salary}</td>
                <td>{app.location}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(app._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Dashboard;
