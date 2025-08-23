export default function Logo() {
    return logoStyles[2];
}

const logoStyles = [
    <div
        className="sticky top-0 relative text-[3vw] italic font-semibold w-full text-center py-[1vw] whitespace-nowrap"
        style={{ fontFamily: "Trebuchet MS" }}
    >
        <div className="absolute z-10 top-[53%] left-[50.2%] translate-[-50%] text-[#919191]">
            ui-builder
        </div>
        <div className="relative z-20">ui-builder</div>
    </div>,
    <div
        className="sticky top-0 relative text-[3vw] italic font-semibold w-full text-center py-[1vw] whitespace-nowrap bg-white"
        style={{ fontFamily: "Trebuchet MS" }}
    >
        <div className="absolute z-20 top-[53%] left-[50.2%] translate-[-50%] text-[#212121]">
            ui-builder
        </div>
        <div className="relative z-10">ui-builder</div>
    </div>,
    <div
        className="sticky top-0 group relative text-[1vw] italic font-semibold w-full text-center whitespace-nowrap bg-white min-h-[5vw] max-h-[5vw] text-[#212121] overflow-hidden"
        style={{ fontFamily: "Trebuchet MS" }}
    >
        <div className="flex flex-wrap w-[250%] h-[250%] translate-x-[-50%] translate-y-[-50%] -rotate-[10deg]">
            {Array(200)
                .fill(1)
                .map((item, index) => {
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
    </div>,
];
