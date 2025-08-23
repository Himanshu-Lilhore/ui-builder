import Create from "./Create";
import Logo from "./Logo";
import Tweak from "./Tweak";

export default function Panel() {
    return (
        <div className="relative flex flex-col w-[30%] border-r border-r-[0.1vw] h-full divide-y-[0.1vw]">
            <Logo />
            <Create />
            <Tweak />
        </div>
    );
}
