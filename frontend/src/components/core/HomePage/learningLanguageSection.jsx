import HighlightText from "./hilightText"
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compate_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"
const LearningLanguageSection = () => {
  return (
    <>
    <div className="maindiv flex flex-col gap-5 mt-[130px] items-center mb-32">
      <div className="headingcontent text-4xl font-semibold text-center flex flex-row justify-center gap-4">
        <p className="">Your Swiss Knife for</p>
        <HighlightText text={"learning any language"}/>
        
      </div>
      <div className="w-[60%] mx-[20%]">
      <p className="text-center text-richblack-600 max-auto text-base font-medium">
          using spin making learning multiple languages easy,with 20+ languages realistic voice-over,
          progress tarcking custom schedule and more
        </p>
      </div>
      
      

  
      <div className="cards flex flex-row  items-center justify-center mt-5">
        <img className="-mr-32" src={know_your_progress} alt="know_your_progress" />
        <img src={compate_with_others} alt="compate_with_others" />
        <img  className='-ml-36' src={plan_your_lessons} alt="plan_your_lessons" />

      </div>
      <div>
      <CTAButton active={true}
      linkto={"/signup"}

      >
        Learn more

      </CTAButton>
      </div>

    </div>
    </>
  )
}

export default LearningLanguageSection