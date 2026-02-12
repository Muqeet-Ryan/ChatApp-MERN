import {create} from 'zustand';
import {api} from '../lib/axios.js'
import SignUpPage from '../pages/SignUpPage.jsx';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSingingUp: false,
  isLoggingIn: false,

  checkAuth: async() => {
    try {
      const res = await api.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async(data) => {
    set({isSingingUp: true});
    try {
      const res = await api.post('/auth/signup', data);
      set({authUser: res.data});
      toast.success('user created');
    } catch (error) {
      console.error('Error in signup', error);
      toast.error('Error signing-up');
    } finally {
      set({isSingingUp: false});
    }
  },
  login: async(data) => {
    set({isLoggingIn: true});
    try {
      const res = await api.post('/auth/login', data);
      set({authUser: res.data});
      toast.success('user logged in');
    } catch (error) {
      console.error('Error in login', error);
      toast.error('Error logging-in');
    } finally {
      set({isLoggingIn: false});
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },
   updateProfile: async (data) => {
    try {
      const res = await api.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response.data.message);
    }
  },

}));

