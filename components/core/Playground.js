import { forwardRef } from "react";
import { Node } from "./Playground/Node";
import { LiveValue } from "./Playground/LiveValue";

const Playground = forwardRef(({ children }, ref) => {
    return (
        <div ref={ref} className="relative h-full w-full flex items-center justify-center">
            {children}
            <LiveValue />
        </div>
    );
});

Playground.displayName = "Playground";

export { Node };
export default Playground;
