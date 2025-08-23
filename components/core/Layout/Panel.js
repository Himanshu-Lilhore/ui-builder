const Panel = ({ children, side = "left" }) => (
    <div
        className={`h-screen border-r bg-white ${
            side === "left" ? "w-[20vw]" : "w-[25vw]"
        }`}
    >
        {children}
    </div>
);

export default Panel;
