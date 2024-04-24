
import HighlightText from '../components/core/HomePage/hilightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/statsComponent'
import ContactForm from '../components/core/AboutPage/ContactForm'

const AboutUs = () => {
  return (
    <>
    <div className='mt-[100px]'>
        <section className='bg-richblack-700 '>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-center text-4xl font-semibold mt-7 text-white'>Driving Innovation in Online Education for a
                <HighlightText text={"Bright future"}/>
            </h1>
            <p className='text-center text-4md font-semibold mt-7 text-richblack-5 font-inter'>Studynotion is at the forefront of driving innovation in online education. 
            We're passionate about creating a brighter future by offering cutting-edge courses, 
            leveraging emerging technologies, and nurturing a vibrant learning community.
            </p>
            <div className='flex flex-row gap-4 mx-auto mt-4'>
                {/* images */}
                <img src={BannerImage1} alt="b1" />
                <img src={BannerImage2} alt="b2" />
                <img src={BannerImage3} alt="b3" />
            </div>
        </div>
        </section>
        {/* section 2 */}
        <section className='justify-center'>
            <Quote/>

        </section>
        <section className=''>
            {/* section 3 */}
            <div className='flex flex-col gap-4 mt-6 justify-center items-center'>
                <div className='flex flex-row justify-between w-[1140px] h-[552px] gap-[98px] pt-[90px] pb-[120px] pl-[90px] pr-[120px]'>
                    {/* Image 1 */}
                    <div className='flex flex-col justify-between items-center text-white w-[486px] h-[372px] gap-[24px]'>
                        {/* content para */}
                        <p className=' text-gradient w-[480px] h-[44px] text-4xl font-semibold '>
                        Our Founding Story   
                        </p>
                        <p className='w-[486px] h-[304px] gap-[16px]'>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        
                        <p className='w-[486px] h-[304px] gap-[16px]'>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>
                    
                    </div>
                    <img className='w-[534px] h-[342px] p-[32px] gap-[2px]' src={FoundingStory} alt="" />
                </div>
                <div className='flex flex-row justify-between text-white w-[1140px] h-[416px] gap-[98px] pt-[90px] pb-[120px] pl-[90px] pr-[120px]'>
                    {/* image 2 */}
                    <div className='flex flex-col w-[486px] h-[212px] gap-[24px]'>
                        {/* content 1 */}
                        <p className='text1-gradient font-inter font-semibold h-[44px] w-[486px] text-4xl '>Our Vision</p>
                        <p className='w-[486px] h-[144px]'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>

                    </div>
                    <div className='flex flex-col gap-4 w-[486px] h-[236px]'>
                        {/* content 1 */}
                        <p className='text2-gradient font-inter font-semibold h-[44px] w-[486px] text-4xl'>Our Mission</p>
                        <p className='w-[486px] h-[144px]'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                        
                    </div>

                </div>
            </div>
        </section>
        <section className=''>
            {/* section 4 */}
            
            <StatsComponent/>
            
            
        </section>
        <section className='ax-auto flex flex-col items-center justify-betweengap-5 mb-[140px]'>
            
        
        <ContactForm/>
        
            
        </section>
        
        
    </div>
    </>
  )
}

export default AboutUs