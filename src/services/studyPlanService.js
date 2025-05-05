import axios from "axios";

const BASE_URL = "http://localhost:8085/studyplan";

export const createStudyPlan = async (userId, planData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create/${userId}`, planData);
    return response.data;
  } catch (error) {
    console.error("Error creating study plan:", error);
    throw error;
  }
};

export const getStudyPlans = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching study plans:", error);
    throw error;
  }
};

export const deleteStudyPlan = async (studyPlanId) => {
  try {
    await axios.delete(`${BASE_URL}/delete/${studyPlanId}`);
  } catch (error) {
    console.error("Error deleting study plan:", error);
    throw error;
  }
};
