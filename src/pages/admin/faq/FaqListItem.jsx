const FaqListItem = ({ faq, index, isChecked, onCheck }) => {

  const formatDate = (dateString) =>{
    if(!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <tr className="border">
      <td className= "px-2 text-center">
        <input 
        type="checkbox" 
        checked= {isChecked}
        onChange={()=> onCheck(faq.id)} 
        />
      </td>
      <td className="border px-2 text-center">{index}</td>
      <td className="border px-2 text-center">{faq.category}</td>
      <td className="border px-2">{faq.question}</td>
      <td className="border px-2 text-center">
        {formatDate(faq.createAt)}
      </td>
    </tr>
  );
};

export default FaqListItem;
