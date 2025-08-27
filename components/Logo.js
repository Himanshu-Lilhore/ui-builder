import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
const pastValueTimeout = 2000; // ms
let timer1, timer2;

export default function Logo() {
    const liveValue = useSelector((state) => state.playground.liveValue);
    const [local, setLocal] = useState(liveValue);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        if (liveValue) {
            setTrigger(true);
            setLocal(liveValue);
            return;
        } else {
            timer1 = setTimeout(() => {
                setTrigger(false);
            }, pastValueTimeout);
            timer2 = setTimeout(() => {
                setLocal(null);
            }, pastValueTimeout + 300);
        }
    }, [liveValue]);

    return (
        <div
            className="sticky top-0 group relative text-[1vw] italic font-semibold w-full text-center whitespace-nowrap bg-white min-h-[6vw] max-h-[6vw] text-[#212121] overflow-hidden"
            style={{ fontFamily: "Trebuchet MS" }}
        >
            <div className="flex flex-wrap w-[100%] h-[100%] translate-x-0 translate-y-[-45%] rotate-x-[30deg] rotate-y-[-20deg] scale-[180%] hover:scale-[120%] duration-300 transition-all">
                {Array(40)
                    .fill(1)
                    .map((_item, index) => {
                        return (
                            <div
                                key={index}
                                className={`${index % 2 ? "bg-white text-[#212121]" : "text-white bg-[#212121]"} relative border-[0.1vw] group-hover:border-white border-[#212121] w-fit px-[0.5vw] py-[0.2vw] duration-300 transition-all overflow-hidden`}
                            >
                                <div
                                    className={`${trigger ? "translate-y-[-100%]" : "translate-y-0"} z-0 ease-in-out duration-300 transition-all`}
                                >
                                    ui-builder
                                </div>
                                <div
                                    className={`${trigger ? "translate-y-0" : "translate-y-[100%]"} ${index % 2 ? "text-[1vw]" : "text-[0.8vw]"} z-10 absolute top-0 left-0 w-full h-full ease-in-out flex items-center justify-center duration-300 transition-all`}
                                >
                                    {local &&
                                        (index % 2 ? `${local.value}${local.unit}` : local.label)}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

const logo1 = (
    <div
        className="sticky top-0 relative text-[3vw] italic font-semibold w-full text-center py-[1vw] whitespace-nowrap"
        style={{ fontFamily: "Trebuchet MS" }}
    >
        <div className="absolute z-10 top-[53%] left-[50.2%] translate-[-50%] text-[#919191]">
            ui-builder
        </div>
        <div className="relative z-20">ui-builder</div>
    </div>
);

const logo2 = (
    <div
        className="sticky top-0 relative text-[3vw] italic font-semibold w-full text-center py-[1vw] whitespace-nowrap bg-white"
        style={{ fontFamily: "Trebuchet MS" }}
    >
        <div className="absolute z-20 top-[53%] left-[50.2%] translate-[-50%] text-[#212121]">
            ui-builder
        </div>
        <div className="relative z-10">ui-builder</div>
    </div>
);

const logo3 = (
    <div
        className="sticky top-0 group relative text-[1vw] italic font-semibold w-full text-center whitespace-nowrap bg-white min-h-[5vw] max-h-[5vw] text-[#212121] overflow-hidden"
        style={{ fontFamily: "Trebuchet MS" }}
    >
        <div className="flex flex-wrap w-[300%] h-[300%] translate-x-[-50%] translate-y-[-70%] rotate-x-[30deg] rotate-y-[-20deg] scale-[180%] hover:scale-[120%] duration-300 transition-all">
            {Array(200)
                .fill(1)
                .map((_item, index) => {
                    return (
                        <div
                            key={index}
                            className={`${index % 2 ? "bg-white text-[#212121]" : "text-white bg-[#212121]"} border-[0.1vw] group-hover:border-white border-[#212121] w-fit px-[0.5vw] py-[0.2vw] duration-300 transition-all`}
                        >
                            ui-builder
                        </div>
                    );
                })}
        </div>
    </div>
);
