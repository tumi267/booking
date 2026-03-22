import Hero from '@/app/components/(public)/Hero/Hero'
import HowItWorks from '@/app/components/(public)/HowItWorks/HowItWorks'
import History from '@/app/components/(public)/about/history/History'
import Offer from '@/app/components/(public)/about/offers/Offer'
import Team from '@/app/components/(public)/about/team/Team'
import Features from '@/app/components/(public)/features/Features'
import React from 'react'

function About() {
    const teamMember=[
        {name:'1',
        title:'1',
        image:'1',
        bio:'1'
    },
    {name:'2',
    title:'2',
    image:'2',
    bio:'2'
},
{name:'3',
title:'3',
image:'3',
bio:'3'
},
{name:'4',
title:'4',
image:'4',
bio:'4'
}
    ]
  return (
    <div>
        <h2>About</h2>
        <Hero
        location='1'
        sectionNum='0'
        />
                {/* <History
        description='lorem'
        image='/images/buddy-an-BVyzjR1AcOI-unsplash.jpg'
        />
        <Team
        teamMember={teamMember}
        />
        <Offer
        service={teamMember}/> */}
        <HowItWorks
        location='1'
        sectionNum='0'
        />
        <Team
        location='1'
        sectionNum='0'
        />
        <Features
        location='1'
        sectionNum='0'
        />
    </div>
  )
}

export default About