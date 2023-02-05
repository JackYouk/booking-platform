import { useState } from "react";
import Button from "./platform ui/Button";

const Tagz = () => {

    let yourImageURL = 'https://imgs.search.brave.com/3bAjDdDF6GYbRte5go5AfjWYJ8Kgow9CFMVgoIHykwk/rs:fit:1200:1200:1/g:ce/aHR0cDovL3BhcGVy/cy5jby93YWxscGFw/ZXIvcGFwZXJzLmNv/LW1zMjMtc2FkLWtp/dHRlbi1jYXQtYW5p/bWFsLW5hdHVyZS1j/dXRlLTM1LTM4NDB4/MjE2MC00ay13YWxs/cGFwZXIuanBn';
    return (
        <>
            <div className="leftNavContainer">
                <div className="leftBtnContainer">
                    <div className={"leftNavBtn"} style={{
                        backgroundImage: `url(${yourImageURL})`,
                        backgroundSize: 'cover',
                    }} text={"div"} />
                    <Button tailwind={"leftNavBtn"} text={"Button"} />
                    <Button tailwind={"leftNavBtn"} text={"Button"} />
                    <Button tailwind={"leftNavBtn"} text={"Button"} />
                </div>
                <div className="flex-[30%] flex-col flex justify-center items-center  smd:absolute smd:top-[34rem] sm:top-[34rem] ">
                    <div className="h-[100px] bg-yellow-600 w-60 lg:w-[11rem] md:w-24 smd:w-[20rem]">
                        ads
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tagz;