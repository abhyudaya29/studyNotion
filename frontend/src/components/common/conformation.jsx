/* eslint-disable no-undef */
import IconButton from "./iconButton"


const conformation = ({modal}) => {
  return (
    <div>
        <div>
            <p>
                {modal.text1}
            </p>
            <p>
                {modal.text2}
            </p>
            <div>
               <IconButton
               onClick={modalData?.btn1Handler}
               text={modalData?.btn1Text}
               />
               <button onClick={modalData?.btn2Handler}>
                {modalData?.btn2Text}

               </button>

            </div>
        </div>
        
    </div>
  )
}

export default conformation