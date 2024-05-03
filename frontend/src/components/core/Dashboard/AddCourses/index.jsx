
import RenderSteps from "./RenderSteps"
const AddCourses = () => {
  return (
    <>
    <div className="text-white flex flex-row gap-6">
        <div>
            <h1>Add Courses</h1>
            <div>
                <RenderSteps/>
            </div>
        </div>
        <div>
            <p>Course Upload Tips</p>
            <ul>
                <l1>Set the Course Price option or make it free.</l1>
                <l1>Standard size for the course thumbnail is 1024x576.</l1>
                <l1>Video section controls the course overview video.</l1>
                <l1>Course Builder is where you create & organize a course.</l1>
                <l1>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</l1>
                <l1>Information from the Additional Data section shows up on the course single page.</l1>
                <l1>Make Announcements to notify any important</l1>
                <li>Notes to all enrolled students at once.</li>
            </ul>
        </div>
    </div>
    </>
  )
}

export default AddCourses