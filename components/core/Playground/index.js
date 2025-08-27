import { forwardRef } from "react";
import { Node } from "./Node";

export default forwardRef(({ children }, ref) => {
    return (
        <div ref={ref} className="relative h-full w-full flex items-center justify-center">
            {children}
        </div>
    );
});

export { Node };
