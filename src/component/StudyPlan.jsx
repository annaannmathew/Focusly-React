import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/StudyPlan.css"; // <-- we'll style this separately

const StudyPlan = ({ userId }) => {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    startDate: "",
    endDate: "",
    subjects: "",
    goal: "",
    completionStatus: "NOT_STARTED",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) {
      fetchPlans();
    }
  }, [userId]);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/studyplan/user/${userId}`);
      setPlans(response.data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)));
    } catch (err) {
      setError("Failed to fetch study plans.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...newPlan,
      subjects: newPlan.subjects.split(",").map((s) => s.trim()),
    };

    try {
      await axios.post(`http://localhost:8085/studyplan/create/${userId}`, payload);
      setNewPlan({ startDate: "", endDate: "", subjects: "", goal: "", completionStatus: "NOT_STARTED" });
      fetchPlans();
    } catch {
      setError("Failed to create plan.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this plan?")) {
      try {
        await axios.delete(`http://localhost:8085/studyplan/delete/${id}`);
        fetchPlans();
      } catch {
        setError("Failed to delete plan.");
      }
    }
  };

  return (
    <div className="studyplan-container">
      <h2>📘 Create Study Plan</h2>
      <form className="studyplan-form" onSubmit={handleSubmit}>
        <input name="startDate" type="date" value={newPlan.startDate} onChange={handleChange} required />
        <input name="endDate" type="date" value={newPlan.endDate} onChange={handleChange} required />
        <input name="subjects" value={newPlan.subjects} onChange={handleChange} placeholder="Subjects (comma separated)" required />
        <input name="goal" value={newPlan.goal} onChange={handleChange} placeholder="Goal" required />
        <select name="completionStatus" value={newPlan.completionStatus} onChange={handleChange}>
          <option value="NOT_STARTED">Not Started</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button type="submit">Create</button>
      </form>

      {error && <p className="error">{error}</p>}

      <h3>🗂 Your Study Plans</h3>
      <div className="plan-list">
        {plans.length === 0 ? (
          <p>No plans yet.</p>
        ) : (
          plans.map((plan) => (
            <div key={plan.id} className="plan-card">
              <h4>{plan.goal}</h4>
              <p><strong>Dates:</strong> {plan.startDate} → {plan.endDate}</p>
              <p><strong>Subjects:</strong> {plan.subjects.join(", ")}</p>
              <p className={`status ${plan.completionStatus.toLowerCase()}`}>{plan.completionStatus}</p>
              <button onClick={() => handleDelete(plan.id)} className="delete-btn">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudyPlan;
