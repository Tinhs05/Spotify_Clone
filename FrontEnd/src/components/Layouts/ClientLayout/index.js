import { TrackProvider, useTrack } from "../contexts/TrackProvider";
import { useState } from "react";
import  React  from "react";
import HeaderClient from "../components/HeaderClient";
import Playlists from "../components/Playlists";
import MediaControls from "../components/MediaControls";
import "./ClientLayout.css";

function ClientLayout({ children }) {
    const [currentTrack, setCurrentTrack] = useState(null);

    return (
        
        <div className="ClientLayout">
            <div className="ClientLayout_Header">
                <HeaderClient />
            </div>
            <div className="ClientLayout_WrapContent">
                <div className="ClientLayout_Playlists">
                    <Playlists />
                </div>
                <div className="ClientLayout_Main">
                    {children}
                </div>
            </div>
            <div className="ClientLayout_Media-Controls">
                <MediaControls 
                    track={currentTrack}
                />
            </div>
        </div>
    )
}

export default ClientLayout;
