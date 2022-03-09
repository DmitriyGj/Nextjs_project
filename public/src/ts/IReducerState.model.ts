import { FetchStatus } from "../constants/FetchStatus"

export interface IReducerState<T,F> {
    fetchStatus: FetchStatus
    isLoad:boolean
    items: T[]
    page: number
    offset: number
    currentItem: F | null
}

