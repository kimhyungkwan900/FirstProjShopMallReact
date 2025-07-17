
import axios from "axios";
import { withCsrfEmpty } from "../../../utils/common/withCsrf";

const API_BASE_URL = "http://localhost:8080/api"; 

export const adminTrackingInput = async(trackingInfo, csrfToken) => {
    const response = await axios.post(`${API_BASE_URL}/order/trackingInput`,trackingInfo, withCsrfEmpty(csrfToken))
    return response.data;
}
