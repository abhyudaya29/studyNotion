import { useDispatch, useSelector } from "react-redux"
import ReactStars from 'react-stars'
import { render } from 'react-dom'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { removeCart } from "../../../../slices/cartSlice";
const RenderCartCourses = () => {
    const dispatch=useDispatch();
    const{cart}=useSelector((state)=>state.cart);
    console.log(cart,">>>>cart data");

  return (
    <>
    <div>
        {
            cart.map((course,index)=>(
                <>
                <div>
                    <img src={course?.thumbnail} alt="thumbnail" />
                    <div>
                        <p>{course?.name}</p>
                        <p>{course.category?.name}</p>
                        {/* TODO: Integrate avg rating API */}
                        <p>4.5</p>
                        <ReactStars
                        count={5}
                        size={20}
                        color2={'#ffd700'}
                        emptyIcon={<FaRegStar />}
                        fullIcon={<FaStar />
}
                        />
                        <span>{course?.ratingAndReviews?.length}Ratings</span>

                    </div>
                </div>
                <div>
                    ,<button className=""onClick={dispatch(removeCart(course._id))}>
                    <MdOutlineDeleteSweep />
                    <span>Remove</span>
                    </button>
                    <p>{course?.price}</p>
                </div>


                </>
            ))
        }


    </div>
    </>
  )
}

export default RenderCartCourses