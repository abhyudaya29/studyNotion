import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RendertotalAmount from "./RendertotalAmount";

export default function Cart() {
    const { total, totalItems } = useSelector((state) => state.cart);

    return (
        <>
            <div className="text-white">
                <h1>Your Cart</h1>
                <p>{totalItems} Courses in cart</p>
                {total > 0 ? (
                    <div className="flex gap-6 justify-between">
                        <RenderCartCourses />
                        <RendertotalAmount />
                    </div>
                ) : (
                    <div>
                        Cart is empty
                    </div>
                )}
            </div>
        </>
    );
}
