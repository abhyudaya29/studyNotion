import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllUserEnrolledCourses } from "../../../services/operations/profile";
import ProgressBar from "@ramonak/react-progress-bar";
const Enrolled = () => {
    const { token } = useSelector((state) => state.auth);
    const [enrolledcourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try {
            const response = await getAllUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return (
        <div className="text-white">
            <div>
                Enrolled Courses
                {!enrolledcourses ? (
                    <div>Loading...</div>
                ) : enrolledcourses.length === 0 ? (
                    <p className="text-white">No enrolled courses yet</p>
                ) : (
                    <div>
                        <div>
                            <p>Course Name</p>
                            <p>Duration</p>
                            <p>Progress</p>
                        </div>
                        <div>
                            {enrolledcourses.map((course, index) => (
                                <div key={index}>
                                    <img src={course.thumbnail} alt="" />
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>
                                    <div>
                                        <p>Progress:{course.progressPercentage||0}</p>
                                        <ProgressBar completed={course.progressPercentage||0}
                                        height="8px"
                                        isLabelVisible={false}
                                        />
                                    </div>
                                </div>
                                
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Enrolled;
