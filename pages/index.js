import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Panel from "../components/Panel";
import WorkspaceSection from "../components/core/WorkspaceSection";

export default function Home() {
    const dispatch = useDispatch();
    const selectedId = useSelector((state) => state.playground.selectedId);

    useEffect(() => {
        // Delete key press
        const handleKeyDown = (e) => {
            if (e.key === "Delete" && selectedId) {
                dispatch({ type: "playground/deleteNode", payload: selectedId });
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [dispatch, selectedId]);

    return (
        <div className="h-screen flex relative overflow-hidden">
            <Panel />
            <WorkspaceSection />
        </div>
    );
}
