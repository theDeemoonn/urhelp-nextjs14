import { create } from 'zustand'

interface IPGLimit {
  limit: number
  setLimit: (limit: number) => void
}



export const usePGLimit = create<IPGLimit>((set) => ({
  limit: 15,
  setLimit: (limit) => set({ limit }),
}))




  

      