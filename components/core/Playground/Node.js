import { nodePropsToStyle } from '../../../utils/styleUtils';

// [&>div.absolute]:opacity-0 [&>div.absolute:hover]:opacity-100

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
            className="m-2 cursor-pointer relative [&:hover>.absolute-border]:opacity-100"
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
            <div className='absolute-border absolute pointer-events-none top-0 left-0 opacity-0 w-full h-full border-[0.15vw] border-red-500 z-[999]'>
            </div>
            {node.children && node.children.length > 0 && (
                <div className="w-full h-full">{children}</div>
            )}
        </div>
    );
};
