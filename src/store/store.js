import { create } from "zustand";

const useGlobalStore = create((set) => ({
  apiUrl: "https://outgoing-grizzly-in.ngrok-free.app",
  setApiUrl: (value) => set({ globalVariable: value }),
}));

export default useGlobalStore;
