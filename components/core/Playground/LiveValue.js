import { useSelector } from 'react-redux';

export const LiveValue = () => {
    const liveValue = useSelector((state) => state.playground.liveValue);
    if (!liveValue) return null;

    return (
        <div
            style={{
                position: "absolute",
                top: "1vw",
                right: "2vw",
                zIndex: 50,
                background: "rgba(30,41,59,0.95)",
                color: "#fff",
                fontSize: "2vw",
                padding: "0.6vw 1.2vw",
                borderRadius: "0.6vw",
                fontWeight: 600,
                pointerEvents: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            }}
        >
            {liveValue.label}: {liveValue.value}
            {liveValue.unit && (
                <span style={{ fontSize: "1vw", marginLeft: "0.3vw" }}>
                    {liveValue.unit}
                </span>
            )}
        </div>
    );
};
