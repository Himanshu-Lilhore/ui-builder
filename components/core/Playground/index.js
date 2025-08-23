import { forwardRef } from "react";
import { Node } from "./Node";
import { LiveValue } from "./LiveValue";

export default forwardRef(({ children }, ref) => {
    return (
        <div ref={ref} className="relative h-full w-full flex items-center justify-center">
            {children}
            <LiveValue />
        </div>
    );
});

export { Node };
