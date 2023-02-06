import { useQuery } from "@apollo/client";
import { useState } from "react";
import { QUERY_TAGS } from "../../utils/queries";
import Button from "./platform ui/Button";

const Tagz = () => {
    const { loading, data } = useQuery(QUERY_TAGS);
    let yourImageURL = 'https://imgs.search.brave.com/3bAjDdDF6GYbRte5go5AfjWYJ8Kgow9CFMVgoIHykwk/rs:fit:1200:1200:1/g:ce/aHR0cDovL3BhcGVy/cy5jby93YWxscGFw/ZXIvcGFwZXJzLmNv/LW1zMjMtc2FkLWtp/dHRlbi1jYXQtYW5p/bWFsLW5hdHVyZS1j/dXRlLTM1LTM4NDB4/MjE2MC00ay13YWxs/cGFwZXIuanBn';
    return (
        <>
            {loading ? (
                <div className="leftNavContainer">
                    <div className="leftBtnContainer">
                        <div className={"leftNavBtn"} style={{
                            backgroundImage: `url(${yourImageURL})`,
                            backgroundSize: 'cover',
                            color: 'black',
                            padding: '60px',
                        }}>
                            TAG
                        </div>
                        <div className={"leftNavBtn"} style={{
                            backgroundImage: `url(${yourImageURL})`,
                            backgroundSize: 'cover',
                            color: 'black',
                            padding: '60px',
                        }}>
                            TAG
                        </div>
                        <div className={"leftNavBtn"} style={{
                            backgroundImage: `url(${yourImageURL})`,
                            backgroundSize: 'cover',
                            color: 'black',
                            padding: '60px',
                        }}>
                            TAG
                        </div>
                        <div className={"leftNavBtn"} style={{
                            backgroundImage: `url(${yourImageURL})`,
                            backgroundSize: 'cover',
                            color: 'black',
                            padding: '60px',
                        }}>
                            TAG
                        </div>
                    </div>
                    
                </div>
            ) : (
                <div className="leftNavContainer">
                    <div className="leftBtnContainer">
                        {data.tags.map(tag => {
                            return (
                            <>
                            <div className={"leftNavBtn"} style={{
                            backgroundImage: `url(${tag.imgPath})`,
                            backgroundSize: 'cover',
                            color: 'black',
                            padding: '55px',
                            }}>
                                {tag.type}
                            </div>
                            
                            </>
                            );
                        })}
                        <div className={"leftNavBtn"} style={{
                                backgroundImage: `url(${yourImageURL})`,
                                backgroundSize: 'cover',
                                color: 'black',
                                padding: '55px',
                            }}>
                                ADS
                            </div>
                    </div>
                    
                </div>
            )}

        </>
    );
}

export default Tagz;