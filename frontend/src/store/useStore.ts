import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserType {
    token : string;
    username : string;
    email : string;
    _id : string;
}

interface UserStore {
    user : UserType;
    setUser : (data : UserType) => void;
}

const useUserStore = create<UserStore>()(persist((set) => ({
    user : {
        token: "",
        username: "",
        email: "",
        _id: ""
    },
    setUser : (data) => set(() => ({ user : data })),
}),
{
    name : "secondBrainUser",
    storage : createJSONStorage(() => localStorage)
}
));

export default useUserStore;