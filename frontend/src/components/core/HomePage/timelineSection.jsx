import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from "../../../assets/Images/TimelineImage.png"

const TimelineSection=()=>{

    const timeLine=[
        {
            Logo:Logo1,
            heading:"Leadership",
            Description:"Fully commited to the success company"
        },
        {
            Logo:Logo2,
            heading:"Leadership",
            Description:"Fully commited to the success company"
        },
        {
            Logo:Logo3,
            heading:"Leadership",
            Description:"Fully commited to the success company"
        },
        {
            Logo:Logo4,
            heading:"Leadership",
            Description:"Fully commited to the success company"
        }  
    ]
    return (
        <>
        <div className="maidiv flex flex-row gap-15 items-center">

            <div className="content w-[45%] flex flex-col gap-5">
                {
                    timeLine.map((element,index)=>{
                        return (
                            <>
                            <div className="flex flex-row gap-6" key={index}>
                                <div className="w-[50px] bg-white flex items-center">
                                    <img src={element.Logo}/>

                                </div>
                                <div>
                                    <h1 className="font-semibold text-[18px]">{element.heading}</h1>
                                    <p className="text-base">{element.Description}</p>
                                </div>
                                
                            </div>
                            </>
                            
                        )
                    })
                }


            </div>
            <div className="image relative shadow-blue-200">
                <img className="shadow-blue" src={TimelineImage} alt="women "  />
                <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
                        <p className="text-3xl font-bold">10</p>
                        <p className="text-caribbeangreen-300 text-sm">Years of Experience</p>
                    </div>
                    <div className="flex gap-5 items-center px-7"></div>
                    <p className="text-3xl font-bold">250</p>
                        <p className="text-caribbeangreen-300 text-sm">Types of courses</p>

                </div>


            </div>


        </div>
        </>
    )
}
export default TimelineSection