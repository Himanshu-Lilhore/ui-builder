import { useDispatch } from "react-redux";
import { updateProp, setLiveValue } from "../../../store/slices/playground";

export const PropertySlider = ({ prop, node }) => {
    const dispatch = useDispatch();

    return (
        <div className="w-full flex items-center px-1 mb-2">
            <input
                type="range"
                min={prop.min}
                max={prop.max}
                step={prop.step}
                value={node.props[prop.key] ?? ""}
                onChange={(e) => {
                    dispatch(updateProp({
                        id: node.id,
                        prop: prop.key,
                        value: Number(e.target.value)
                    }));
                }}
                className="w-full accent-blue-600 h-1.5 rounded-lg appearance-none cursor-pointer"
                onClick={(e) => e.stopPropagation()}
                onBlur={() => dispatch(setLiveValue(null))}
            />
        </div>
    );
};
