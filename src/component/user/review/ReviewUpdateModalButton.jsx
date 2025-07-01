import {useState} from "react";
import ReviewUpdateModal from "./ReviewUpdateModal";

import ReviewUpdateForm from "./ReviewUpdateForm";

const ReviewUpdateModalButton = ({reviewId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    return(
        <div>
            <button onClick={openModal} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm" >수정</button> 
                <ReviewUpdateModal isOpen={isModalOpen}>
            <div className="p-4 flex flex-col max-h-[70vh] overflow-y-auto">
                <h2 className="text-lg font-bold text-center mb-5">리뷰 수정</h2>
                <hr className="mb-5"/>
                <ReviewUpdateForm reviewId={reviewId} onClose = {closeModal}/>
            </div>
                </ReviewUpdateModal>
        </div>
    )
}

export default ReviewUpdateModalButton;