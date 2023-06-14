import { MYIMAGE, MYNAME } from "@/config";
import React, { FC, MouseEvent, useRef } from "react";
import Image from "next/image";

const Avatar: FC = () => {
    const multiple = 2;
    const avatarRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        let avatarEl = avatarRef?.current?.getBoundingClientRect();
        if (!avatarEl) return;
        if (!avatarRef.current) return;
        let calcY = (e.clientX - avatarEl.x - avatarEl.width / 2) / multiple;
        let calcX = -(e.clientY - avatarEl.y - avatarEl.height / 2) / multiple;
        avatarRef.current!.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg)`;
    };

    const handleMouseLeave = () => {
        if (!avatarRef.current) return;
        avatarRef.current!.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    return (
        <div
            ref={avatarRef}
            className="outer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="avatar">
                <Image
                    width={128}
                    height={128}
                    className="rounded-full"
                    src={MYIMAGE}
                    alt={MYNAME}
                />
            </div>
        </div>
    );
};

export default Avatar;
