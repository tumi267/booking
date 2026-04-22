import { getOverRideDates } from "./service";

export async function getOverRideAction(month:number,year:number){
    return getOverRideDates(month,year)
}
export async function createOverRideAction(){}
export async function updateOverRideAction(){}
export async function deleteOverRideAction(){}