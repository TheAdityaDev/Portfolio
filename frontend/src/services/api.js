import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// Projects API
export const projectsAPI = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },
  
  create: async (projectData) => {
  try {
    const response = await apiClient.post('/projects', projectData);

    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
},
};

// Contact API
export const contactAPI = {
  submit: async (contactData) => {
    try {
      const response = await apiClient.post('/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },
};

// Skills API (for future use)
export const skillsAPI = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/skills');
      return response.data;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
  },
};

export default apiClient;
