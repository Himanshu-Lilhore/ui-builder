import { useDispatch } from "react-redux";
import { updateProp, setLiveValue } from "../../../store/playgroundSlice";

export const PropertyControl = ({ prop, node, handleInputMouseDown }) => {
    const dispatch = useDispatch();
    const isSlider = prop.type === "slider";

    return (
        <div className="flex items-center gap-1">
            {isSlider ? (
                <input
                    type="number"
                    min={prop.min}
                    max={prop.max}
                    step={prop.step}
                    value={
                        node.props[prop.key] !== undefined && node.props[prop.key] !== null
                            ? Number(node.props[prop.key]).toFixed(2)
                            : ""
                    }
                    onChange={(e) => {
                        dispatch(updateProp({
                            id: node.id,
                            prop: prop.key,
                            value: Number(e.target.value)
                        }));
                    }}
                    className="w-16 border rounded px-1 text-[0.9vw] cursor-ns-resize bg-white text-black"
                    onMouseDown={(e) => handleInputMouseDown(e, prop.key, prop)}
                    onClick={(e) => e.stopPropagation()}
                    onBlur={() => dispatch(setLiveValue(null))}
                />
            ) : prop.type === "color" ? (
                <input
                    type="color"
                    value={node.props[prop.key] ?? "#212121"}
                    onChange={(e) => dispatch(updateProp({
                        id: node.id,
                        prop: prop.key,
                        value: e.target.value
                    }))}
                    className="w-8 h-8 rounded-full cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                />
            ) : prop.type === "toggle" ? (
                <input
                    type="checkbox"
                    checked={!!node.props[prop.key]}
                    onChange={(e) => dispatch(updateProp({
                        id: node.id,
                        prop: prop.key,
                        value: e.target.checked
                    }))}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                />
            ) : prop.type === "select" ? (
                <select
                    value={node.props[prop.key] ?? prop.options[0]}
                    onChange={(e) => dispatch(updateProp({
                        id: node.id,
                        prop: prop.key,
                        value: e.target.value
                    }))}
                    className="border rounded px-1 text-[0.9vw] bg-white text-black cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                >
                    {prop.options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            ) : null}
            {isSlider && (
                <span className="text-[0.8vw] text-gray-400 ml-1 select-none">
                    vw
                </span>
            )}
        </div>
    );
};
