  export async function fetchCustomers() {
    const response = await fetch('/api/getUser');
    if (!response.ok) throw new Error('Failed to fetch customers');
    return response.json()
  }
  
  export async function createCustomer() {

  }
  
  export async function updateCustomer(

  ) {
  }
  
  export async function deleteCustomer(id: string) {

  }
  