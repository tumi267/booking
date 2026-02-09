import Hero from '@/app/components/(public)/Hero/Hero'
import History from '@/app/components/(public)/about/history/History'
import Offer from '@/app/components/(public)/about/offers/Offer'
import Team from '@/app/components/(public)/about/team/Team'
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
        url='/images/buddy-an-BVyzjR1AcOI-unsplash.jpg'
        text='some text'
        />
        <History
        description='lorem'
        image='/images/buddy-an-BVyzjR1AcOI-unsplash.jpg'
        />
        <Team
        teamMember={teamMember}
        />
        <Offer
        service={teamMember}/>
    </div>
  )
}

export default About