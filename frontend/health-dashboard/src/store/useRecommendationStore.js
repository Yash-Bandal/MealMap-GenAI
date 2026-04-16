import { create } from "zustand";

const useRecommendationStore = create((set) => ({
    recommendations: null,
    formValues: {},
    error: null,

    setRecommendations: (data) => set({ recommendations: data }),
    setFormValues: (data) => set({ formValues: data }),
    setError: (err) => set({ error: err }),
    clearAll: () => set({ recommendations: null, formValues: {}, error: null }),
}));

export default useRecommendationStore;