import { updateProp, setLiveValue } from "../../playgroundSlice";
import { useDispatch } from "react-redux";

export const PropertyControl = ({ prop, node, expanded, handleInputMouseDown, getUnit }) => {
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
                        dispatch(setLiveValue({
                            prop: prop.key,
                            value: Number(e.target.value),
                            label: prop.label,
                            unit: getUnit(prop.key)
                        }));
                    }}
                    className="w-16 border px-1 text-[0.9vw] cursor-ns-resize"
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
                    className="w-8 h-8 rounded-full"
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
                    className="border px-1 text-[0.9vw] bg-white text-black"
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
                    {getUnit(prop.key)}
                </span>
            )}
        </div>
    );
};
