import { create } from 'zustand'

type Store = {
  currentContact: string | any
  setCurrentContact: (id: string | null) => void
}

export const useCurrentContact = create<Store>()((set) => ({
    currentContact: null,
    setCurrentContact: (id) => set({ currentContact: id }),
}))

