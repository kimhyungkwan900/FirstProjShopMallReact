import React from "react";
                     
const Pagination = ({ currentPage, totalCount, pageSize, onPageChange}) =>{   //지금보고있는 페이지 번호, 전체 faq 수, 한페이지에 보여줄 개수, 페이지 바뀌면 실행되는 함수 
    const totalPages = Math.ceil(totalCount / pageSize); //전체 페이지 수 

    //현재 페이지 그룹의 시작번호아 끝 번호 계산 
    const groupSize = 10;
    const currentGroup = Math.floor((currentPage - 1) / groupSize);
    const startPage = currentGroup * groupSize + 1;
    const endPage = Math.min(startPage + groupSize - 1, totalPages);

    //페이지 번호 배열 만들기
    const pageNumbers = [];
    for(let i = startPage; i <= endPage; i++){
        pageNumbers.push(i);
    }

    return(
        <div className="flex justify-center mt-4 space-x-2">
            {/* 이전 버튼 */}
            {startPage > 1 && (
                <button 
                onClick={()=> onPageChange(startPage - 1)}
                className="px-2 py-1 border rounded hover:bg-gray-100">이전</button>
            )}

            {/* 페이지 번호 버튼 */}
            {pageNumbers.map((page)=>(
                <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}>
             {page}
            </button>
            ))}

            {/* 다음 버튼 */}
            {endPage < totalPages && (
                <button
                onClick={()=> onPageChange(endPage + 1)}
                className="px-2 py-1 border rounded hover:bg-gray-100">다음</button>
            )}
        </div>
    );
};

export default Pagination;