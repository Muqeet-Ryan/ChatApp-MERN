import {create} from 'zustand';
import {api} from '../lib/axios.js'
import SignUpPage from '../pages/SignUpPage.jsx';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSingingUp: false,

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

}));

