import create from "zustand";

const useStore = create((set) => ({
  currentPageIndex: 0,
  movementId: 0,
  contentPage: '',
  movements: [],
  lights: [
    {
      distance: 20000,
      color: 0xffffff,
      flareColor: 0xffffff,
      position: [0, 0, -1000],
      hsl: [0.55, 0.9, 0.5],
    },
    {
      distance: 12000,
      color: "#96008f",
      flareColor: "#fc95f7",
      position: [1000000, 1000000, -1000000],
      hsl: [0.08, 0.8, 0.5],
    },
  ],
  planets: [
    {
      name: "sun",
      args: [4200],
      // args: [130000],
      position: [0, 0, 0],
    },
    {
      texture: "mercury",
      args: [50],
      position: [18000, 0, 0],
    },
    {
      texture: "venus",
      args: [120],
      position: [40000, 0, 0],
    },
    {
      texture: "earth",
      args: [130],
      position: [60000, 0, 0],
    },
    {
      texture: "mars",
      args: [69],
      position: [90000, 0, 0],
    },
    {
      texture: "jupiter",
      args: [1400],
      position: [150000, 0, 0],
    },
    {
      texture: "saturn",
      args: [1200],
      position: [220000, 0, -300],
    },
    {
      texture: "uranus",
      args: [510],
      position: [310000, 0, -300],
    },
    {
      texture: "neptune",
      args: [490],
      position: [420000, 0, -300],
    },
  ],
  addMovement: (movement) =>
    set((state) => ({ movements: new Set([...state.movements, movement]) })),
  removeMovement: (movement) =>
    set((state) => {
      const movements = [...state.movements];
      const ind = movements.findIndex((m) => m === movement);
      if (ind > -1) {
        movements.splice(ind, 1);
      }
      return { movements };
    }),
  setCurrentPageIndex: (currentPageIndex) => set({ currentPageIndex }),
  setMovementId: (movementId) => set({ movementId }),
  setContentPage: (contentPage) => set({ contentPage }),
}));

export default useStore;
