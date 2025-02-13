import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import commonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import CommentStore from "./commentStore";

interface Store{
    activityStore: ActivityStore
    commonStore: commonStore
    userStore: UserStore
    modalStore: ModalStore
    profileStore: ProfileStore
    commentStore: CommentStore
}

// bu store contextimizde yer alacak  
export const store: Store={
    activityStore: new ActivityStore(),
    commonStore: new commonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore()
}
export const StoreContext=createContext(store);

export function useStore(){
    return useContext(StoreContext);
}