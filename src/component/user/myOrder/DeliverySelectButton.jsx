const DeliverySelectButton = ({ trackingNumber, courierCode }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://info.sweettracker.co.kr/tracking/5"; // 연결 url 
    form.target = "trackingPopup";
    form.style.display = "none";

    const keyInput = document.createElement("input"); 
    keyInput.type = "hidden";
    keyInput.name = "t_key";
    keyInput.value = "O039bE1iS0V23XbK78dxdw"; // api 토큰 
    form.appendChild(keyInput);

    const codeInput = document.createElement("input");
    codeInput.type = "hidden";
    codeInput.name = "t_code";
    codeInput.value = courierCode; //택배사 코드 (04 = 대한통운,  06 = 롯데택배,  08 = 로젠택배)
    form.appendChild(codeInput);


    const invoiceInput = document.createElement("input");
    invoiceInput.type = "hidden";
    invoiceInput.name = "t_invoice";
    invoiceInput.value = trackingNumber; // 운송장 번호 
    form.appendChild(invoiceInput);

    document.body.appendChild(form);
    window.open('', 'trackingPopup', 'width=600,height=800');
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <button
        type="button"
        onClick={handleSubmit}
        className="px-2 py-1 ml-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow-md transition duration-200"
        >
  배송 조회
</button>
  );
};

export default DeliverySelectButton;