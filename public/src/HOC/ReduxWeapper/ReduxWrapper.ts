import { IceAndFireStore } from "../../store/IceAndFireStore";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => IceAndFireStore;
export const wrapper = createWrapper(makeStore);