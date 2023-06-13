import axios, { AxiosResponse } from "axios";
import { NEXT_MBX_APIKEY } from "@/config/index";

type responseType = {
    price: number;
    symbol: string;
};
export const GET = async (req: Request, res: Response) => {
    try {
        const response: AxiosResponse<responseType> = await axios.get(
            "https://api.binance.com/api/v3/ticker/price",
            {
                params: {
                    symbol: "ETHUSDT",
                },
                headers: {
                    "Content-Type": "application/json",
                    "X-MBX-APIKEY": NEXT_MBX_APIKEY,
                },
            }
        );
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
};
