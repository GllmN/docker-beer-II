import { Type } from "./type.model";

export class Beer {
    constructor(
        public marque: string,
        public price: number,
        public type: Type,
        public id?: string,
    ){}
}