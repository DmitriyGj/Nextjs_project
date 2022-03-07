export interface IReducerState<T,F> {
    fetchStatus: 'needed' | 'fulfilled' | 'rejected' | 'pending'
    isLoad:boolean
    items: T[]
    page: number
    offset: number
    currentItem: F | undefined
}

