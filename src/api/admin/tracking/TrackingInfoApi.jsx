
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; 

export const adminTrackingInput = async(trackingInfo) => {
    const response = await axios.post(`${API_BASE_URL}/order/trackingInput`,trackingInfo)
    return response.data;
}
