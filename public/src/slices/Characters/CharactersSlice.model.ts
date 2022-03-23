import { Slice } from "@reduxjs/toolkit";
import { FetchStatus } from "../../constants";
import { ICharacter } from "../../services";
import { ICharacterFullInfo } from "../../ts";

export interface ICharacterState{
    page: number,
    fetchStatus: FetchStatus
    characters: ICharacter[]
    currentCharacter: ICharacterFullInfo | null
};
