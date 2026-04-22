import { getOverRideDates,toggleOverRide} from "./service";

export async function getOverRideAction(month:number,year:number){
    return getOverRideDates(month,year)
}

export async function toggleOverRideAction(date: Date) {
  return toggleOverRide(date)
}
export async function updateOverRideAction(){}
export async function deleteOverRideAction(){}