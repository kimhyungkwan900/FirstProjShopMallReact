const FaqListItem = ({ faq, index, isChecked, onCheck }) => {
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
        {faq.createdAt ? faq.createdAt.subString(0, 10) : "-"}</td>
    </tr>
  );
};

export default FaqListItem;
