function Pfp() {
    return (
        <div className="flex justify-center items-center">
            <div className="relative">
                <img
                    src="/images/borderPfp.png"
                    alt="Border"
                    className="w-25 h-25 md:w-40 md:h-40 absolute inset-0 z-10"
                />
                <img
                    src="/images/pfp.jpg"
                    alt="Profile"
                    className="w-25 h-25 rounded-full p-2 md:w-40 md:h-40"
                />
                <div className="absolute left-1/2 bottom-[-10px] transform -translate-x-1/2 z-20">
                    <img src="/images/smolBow.gif" alt="" />
                </div>
                <div className="absolute right-[0px] top-[15px] md:right-1 md:top-8 z-20">
                    <img src="/images/gun.webp" alt="" />
                </div>
                <div className="absolute left-1/2 top-[-10px] transform -translate-x-1/2 z-20">
                    <img src="/images/wings.webp" alt="" className="w-10" />
                </div>
            </div>
        </div>
    );
}

export default Pfp;
