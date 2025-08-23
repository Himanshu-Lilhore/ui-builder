import { nodePropsToStyle } from '../../../utils/styleUtils';

export const Node = ({ node, selectedId, onSelect, children }) => {
    return (
        <div
            key={node.id}
            style={{
                ...nodePropsToStyle(node.props),
                ...(selectedId === node.id
                    ? { outline: "0.15vw dotted #2563eb", outlineOffset: "0.3vw", zIndex: 99 }
                    : {}),
            }}
            className={"m-2 cursor-pointer group relative hover:shadow-lg transition-all duration-200"}
            onClick={onSelect}
        >
            <div
                style={{
                    position: "absolute",
                    top: "0vw",
                    left: "0vw",
                    transform: "translateY(-100%)",
                    fontSize: "0.85vw",
                    fontWeight: 300,
                    color: "#727272ff",
                    borderRadius: "0.4vw",
                    pointerEvents: "none",
                    zIndex: 10,
                }}
            >
                {node.id}
            </div>
            <div
                className="absolute inset-0 pointer-events-none rounded"
                style={{
                    border: "2px solid transparent",
                    zIndex: 9,
                }}
            />
            <style>{`
                .group:hover > .absolute.inset-0 {
                    border-color: #ef4444 !important;
                    box-shadow: 0 0 0 1px #ef4444;
                    z-index: 999;
                }
            `}</style>
            {node.children && node.children.length > 0 && (
                <div className="w-full h-full">{children}</div>
            )}
        </div>
    );
};
