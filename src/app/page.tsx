"use client";

import { BEER_PRICE, GAS_LIMIT, GAS_PRICE, MAX_COUNT, MIN_COUNT, MYNAME, WALLET } from "@/config";
import Image from "next/image";
import { useEffect, useState, ChangeEvent, useMemo } from "react";
import Avatar from "./Avatar/Avatar";

const { ethereum } = window;

export default function Home() {
    const [ethPrice, setEthPrice] = useState(0);
    const [beers, setBeers] = useState("1");
    const [error, setError] = useState("");
    const [txHash, setTxHash] = useState("");

    const twdRate = useMemo(() => {
        if (ethPrice === 0) return 0;
        return 1 / ethPrice;
    }, [ethPrice]);

    const twd = Number(beers) * BEER_PRICE;
    const eth = twd * twdRate;
    const wei = useMemo(() => Math.round(eth * 10 ** 18), [eth]); // Gwei

    const getETHPrice = async () => {
        const res = await fetch("https://api.coinbase.com/v2/exchange-rates?currency=eth");
        const { data } = await res.json();
        setEthPrice(data.rates.TWD);
    };

    useEffect(() => {
        getETHPrice().catch((err) => setError(err));
    }, []);

    const onPlusClick = () => {
        if (Number(beers) > MAX_COUNT) return;
        setBeers((Number(beers) + 1).toString());
    };

    const onMinusClick = () => {
        if (Number(beers) <= MIN_COUNT) return;
        setBeers((Number(beers) - 1).toString());
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const count = Number(e.target.value);
        if (count > MAX_COUNT) return;
        if (count < MIN_COUNT) return;
        console.log(count);
        setBeers(count.toString());
    };

    const onSend = async () => {
        try {
            setError("");
            setTxHash("");
            const [from] = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const txHash = await ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from,
                        to: WALLET,
                        gas: GAS_LIMIT.toString(16),
                        gasPrice: GAS_PRICE.toString(16),
                        value: wei.toString(16),
                    },
                ],
            });
            setTxHash(txHash);
        } catch (e: unknown) {
            // console.log(e);
            setError((e as Error).message);
        }
    };

    return (
        <main className="flex items-center h-screen">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <figure className="flex flex-col px-16 py-16 text-center w-96 bg-slate-200 text-slate-600 rounded-xl">
                        <div className="mb-6 mx-auto">
                            <Avatar />
                        </div>
                        <div className="flex justify-between mb-6 text-lg">
                            Buy
                            <span className="font-bold text-slate-800">{MYNAME}</span>a Beer
                        </div>
                        <div className="flex justify-between items-center ">
                            <Image src="/beer.png" alt="beers" width={40} height={40} />
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
                            {twd} NTD ≈ {eth.toFixed(7)} ETH
                        </div>

                        <div className="text-center my-3 relative">
                            <button
                                onClick={onSend}
                                className={`w-56 rounded-full px-4 py-2 relative text-white
                                    bg-gradient-to-r from-blue-500 to-purple-500
                                    transition ease-in-out duration-300 donate-btn
                                    `}
                            >
                                Donate ETH
                            </button>
                            <div className="flex flex-col text-xs absolute mt-2 justify-center w-full">
                                {!ethereum && (
                                    <div className="text-red-700">
                                        <a
                                            target="_blank"
                                            href="https://metamask.io/download/"
                                            rel="noopener noreferrer"
                                        >
                                            MetaMask
                                        </a>{" "}
                                        is not installed.
                                    </div>
                                )}
                                {error && <div className="text-red-700">{error}</div>}
                                {txHash && (
                                    <div className="text-green-700">
                                        Transaction Hash:{" "}
                                        <a
                                            target="_blank"
                                            href={`https://etherscan.io/tx/${txHash}`}
                                            rel="noopener noreferrer"
                                        >
                                            {txHash.substring(0, 5)}
                                            ...
                                            {txHash.substring(txHash.length - 4)}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </figure>
                </div>
            </div>
        </main>
    );
}
