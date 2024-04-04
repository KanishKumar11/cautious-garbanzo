import { create } from "zustand";

const useGlobalStore = create((set) => ({
  apiUrl: "https://outgoing-grizzly-in.ngrok-free.app",
  setApiUrl: (value) => set({ apiUrl: value }),
  otp: "",
  setOtp: (value) => set({ otp: value }),
  callStatus: false,
  setCallStatus: (value) => set({ callStatus: value }),
  botName: "bot",
  setBotName: (value) => set({ botName: value }),
}));

export default useGlobalStore;
