import { FetchStatus } from "../../constants"
import { IHouse } from "../../services"
import { IHouseFullInfo } from "../../ts"

export interface IHouseState {
    page: number,
    fetchStatus: FetchStatus
    houses: IHouse []
    currentHouse: IHouseFullInfo | null
};
