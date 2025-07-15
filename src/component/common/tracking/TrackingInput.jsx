const TrackingInput = ({ courier, setCourier, trackingNumber, setTrackingNumber }) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">택배사</label>
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={courier}
          onChange={(e) => setCourier(e.target.value)}
        >
          <option value="">택배사 선택</option>
          <option value="04">CJ대한통운</option>
          <option value="08">롯데택배</option>
          <option value="06">로젠택배</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">운송장 번호</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded p-2"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="10~13자리 숫자 입력"
          maxLength={13}
        />
      </div>
    </>
  );
};

export default TrackingInput;