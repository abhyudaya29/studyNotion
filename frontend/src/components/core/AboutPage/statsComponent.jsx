import React from 'react'

const stats=[
    {
        count:"5k",label:"Active Students"
    },
    {
        count:"10+",label:"Mentors"
    },
    {
        count:"200+",label:"Courses"
    },
    {
        count:"50+",label:"Awards"
    },
]
const StatsComponent = () => {
  return (
    <>
    <section className='text-white'>
        <div>
            <div className='flex  justify-center items-center '>
                {stats.map((data,index)=>(
                    <>
                    <div key={index}>
                        <h1>{data.count}</h1>
                        <h1>{data.label}</h1>
                    </div>
                    </>
                ))}
            </div>
        </div>
    </section>
    </>
  )
}

export default StatsComponent