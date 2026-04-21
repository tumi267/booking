'use client'

import { useEffect, useState } from "react";
import { getCustomerAction } from "../libs/Customer/action";
type Customer = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    sessionCount:number;
  };
export function useAdminCustomer(){
    const [customers,setCustomer] = useState<Customer[]>([])
    const [isloading,setLoading]=useState(true)
    useEffect(()=>{
        const getUser = async () => {
          try {
            setLoading(true)
            const data=await getCustomerAction()
            setCustomer(data.data); 
            setLoading(false)
          } catch (error) {
            console.error('Fetch error:', error);
          }
        }
        getUser()
      },[])
      return{customers,isloading}
}