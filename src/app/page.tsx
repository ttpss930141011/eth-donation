"use client";
import Image from "next/image";
import { useEffect, useState, ChangeEvent, useMemo } from "react";
// import { NEXT_PUBLIC_BOT_KEY } from "../env";

export default function Home() {
    const [ethPrice, setEthPrice] = useState(0);
    const [beers, setBeers] = useState("1");
    const [error, setError] = useState("");

    const twdRate = useMemo(() => {
        if (ethPrice === 0) return 0;
        return 1 / ethPrice;
    }, [ethPrice]);

    const getETHPrice = async () => {
        const res = await fetch("https://api.coinbase.com/v2/exchange-rates?currency=eth");
        const { data } = await res.json();
        setEthPrice(data.rates.TWD);
        // const { TWD } = rates;
        console.log(data.rates.TWD);
        // setEthPrice(TWD);
    };

    useEffect(() => {
        // fetch("/api/eth", { method: "GET" })
        //     .then((res) => res.json())
        //     .then(({ price }) => setEthPrice(price))
        //     .catch((err) => setError(err));
        console.log(twdRate);
        getETHPrice();
    }, []);

    const onPlusClick = () => {
        if (Number(beers) > 9999) return;
        setBeers((Number(beers) + 1).toString());
    };

    const onMinusClick = () => {
        if (Number(beers) < 2) return;
        setBeers((Number(beers) - 1).toString());
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const count = Number(e.target.value);
        if (count > 9999) return;
        if (count < 1) return;
        console.log(count);
        setBeers(count.toString());
    };

    return (
        <main className="flex items-center h-screen">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <figure className="flex flex-col px-16 py-16 text-center w-96 bg-slate-200 text-slate-600 rounded-xl">
                        <div className="mb-6">
                            <Image
                                width={128}
                                height={128}
                                className="mx-auto rounded-full"
                                src={`https://github.com/ttpss930141011.png`}
                                alt={"ttpss930141011"}
                            />
                        </div>
                        <div className="flex justify-between mb-6 text-lg">
                            Buy
                            <span className="font-bold text-slate-800">{"ttpss930141011"}</span>a
                            Beer
                        </div>
                        {/* <div>ETH price is {price}</div> */}
                        <div className="flex justify-between items-center ">
                            <Image
                                src="/beer.png"
                                alt="beers"
                                width={40}
                                height={40}
                                // className="mx-auto"
                            />
                            <div className="flex gap-2">
                                <button
                                    className="px-4 py-2 bg-slate-500 text-slate-200 rounded-md hover:bg-slate-400"
                                    onClick={onMinusClick}
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    className="px-2 py-2 bg-slate-500 text-slate-200 rounded-md w-14 text-center"
                                    value={beers}
                                    onChange={onInputChange}
                                />
                                <button
                                    className="px-4 py-2 bg-slate-500 text-slate-200 rounded-md"
                                    onClick={onPlusClick}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="text-center my-3 text-sm text-gray-600">
                            {Number(beers) * 100} NTD ≈ {(Number(beers) * 100 * twdRate).toFixed(7)}{" "}
                            ETH
                        </div>
                        <div className="text-center my-3 ">
                            <button
                                className={
                                    `w-56 rounded-full px-4 py-2 relative text-white
                                    bg-gradient-to-r from-blue-500 to-purple-500
                                    transition ease-in-out duration-300 donate-btn
                                    `
                                }
                            >
                                Donate ETH
                            </button>
                        </div>
                    </figure>
                </div>
            </div>
        </main>
    );
}
