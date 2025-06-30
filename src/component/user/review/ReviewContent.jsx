

const ReviewContent = () => {
    return(
        <div>
            <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
                {/* 한줄 리뷰 & 날짜 */}
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-lg font-semibold text-gray-800">한줄 리뷰 : 아아아</span>
                    <span className="text-sm text-gray-500">등록 날짜 : 2025-06-30</span>
                </div>

                {/* 본문 내용 */}
                <div className="text-gray-700">
                    <strong className="text-gray-900">내용 :</strong> 아아아
                </div>

                {/* 이미지 목록 */}
                <div className="text-gray-700">
                    <strong className="text-gray-900">이미지 :</strong> 1, 2, 3, 4, 5
                </div>

                {/* 좋아요/싫어요 버튼 */}
                <div className="flex space-x-4 pt-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                    좋아요
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    싫어요
                    </button>
                </div>
            </div>  
        </div>
    )
}

export default ReviewContent;