import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState } from "../../store/IceAndFireStore";
import { IFilter } from "../../ts/IFetchParams.model";

export interface FilterBlockProps {
    filterValue: IFilter
    clickApplyHandler: () => void
    selectorFunction: (state: RootState) => IFilter
    setFilterFunction: ActionCreatorWithPayload<IFilter,any>
} 