import { useEffect, useState } from "react";
import { getRestockAlarmList } from "../../../api/user/cart/CartApi";

//재입고 알람 목록


const RestockAlarmList = () =>{

     const [restockAlarmList, setRestockAlarmList] = useState([]); // 초기값 빈 배열
    const [loading, setLoading] = useState(true); // 로딩 상태

    useEffect(()=>{
        const fetchAlarm = async() =>{
            try{
                const response = await getRestockAlarmList();
                const alarmData = response.data?.content ?? response.data ?? [];
                console.log(response.data);
                console.log("Alarm data", alarmData);
                setRestockAlarmList(Array.isArray(alarmData) ? alarmData : []);
            }catch(error){
                console.error("재입고 알림 목록 불러오기 실패", error)
            }finally{
                setLoading(false); //로딩 종료
            }
        };
        fetchAlarm();
    },[])
    
    if(loading){
         return <div className="text-center py-8">불러오는 중...</div>;
    }

    return(
        <div>
            <div>
                <div className=" text-2xl mb-6">재입고 알림 내역</div>
                <div>
                    <ul>
                        <li>• 알림 신청 순서대로 발송됩니다.</li>
                        <li>• 알림 신청 상품을 구매하거나, 60일이 지나면 자동 해제됩니다.</li>
                        <li>• 인기 상품은 알림 후 조기 품절될 수 있습니다.</li>
                        <li>• 알림 신청 당시의 상품 구성, 가격은 재입고 시 변경될 수 있습니다.</li>
                    </ul>
                </div>
                    {restockAlarmList.length === 0 ?
                        (<p>재입고 알림 신청 내역이 없습니다.</p>) : 
                        (
                            <div>
                                {restockAlarmList.map((alarm)=>(
                                    <div key={alarm.productId}
                                    className="w-full h-40 object-cover rounded-lg mb-3"
                                    >
                                    <img
                                    src={alarm.imageUrl}
                                    className="w-full h-40 object-cover rounded-lg mb-3"
                                    />
                                    <h2>{alarm.productBrandName}</h2>
                                    <span>{alarm.productName}</span>
                                    </div>
                                ))}

                                <button>알림</button>
                            </div>
                            
                        )
                
                }
                <div>

                </div>
            </div>
        </div>
    );
};

export default RestockAlarmList;