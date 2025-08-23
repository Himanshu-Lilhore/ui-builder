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
            className={"m-2 cursor-pointer group relative"}
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
            <div className='absolute opacity-0 pointer-events-none group-hover:opacity-100 top-0 left-0 w-full h-full border-[0.1vw] border-red-500 z-[999]'>
            </div>
            {node.children && node.children.length > 0 && (
                <div className="w-full h-full">{children}</div>
            )}
        </div>
    );
};
