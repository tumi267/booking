'use client'
import Loading from '@/app/components/Loading/Loading';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'; // Use navigation for App Router
import React, { useEffect } from 'react'

function Page() {
    const { isLoaded, user } = useUser();
    const router = useRouter();

    const createUserInDb = async () => {
        if (!user) return;

        try {
          const res = await fetch('/api/user', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              clerkId: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              firstName: user.firstName,
              lastName: user.lastName,
              imageurl: user.imageUrl,
              phone: user.primaryPhoneNumber?.phoneNumber
            })
          });
      
          if (!res.ok) throw new Error('Failed to sync user');
          
          const data = await res.json(); 

          // Logic based on your API response
          if (data.user === 0) {
            router.push(`/user/${user.id}`);
          } else if (data.user === 1) {
            router.push(`/provider/${user.id}`); // Or wherever providers go
          }
          
        } catch (error) {
          console.error('Error syncing user:', error);
          // Optional: router.push('/error') so they aren't stuck on Loading
        }
    };

    useEffect(() => {
        if (isLoaded && user) {
            createUserInDb();
        }
    }, [isLoaded, user]);

    return <Loading />;
}

export default Page;
