import { deleteOrder } from "../../../api/user/myOrder/MyOrderDeleteApi";
import { useCsrfToken } from "../../../hooks/common/useCsrfToken";

const MyOrderDeleteButton = ({ orderId, onDelete }) => {
  const csrfToken = useCsrfToken();
  
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("정말 삭제 하시겠습니까? (복구 불가능)")) {
      return;
    }
    try {
      await deleteOrder(orderId, csrfToken);
      onDelete(orderId);  // 여기서 onDelete가 함수가 아니면 에러 발생
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return (
    <button 
    className="bg-gray-400 p-1 rounded text-white cursor-pointer font-bold hover:bg-gray-500"
    onClick={() => handleDeleteOrder(orderId)}>
      삭제
    </button>
  );
};
export default MyOrderDeleteButton;