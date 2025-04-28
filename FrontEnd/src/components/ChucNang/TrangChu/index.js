import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Footer from "../../Layouts/components/Footer";
import "./TrangChu.css";
import HomePage from "./HomePage";
import PlaylistPage from "./PlaylistPage";
import FavoritePage from "./FavoritePage";
import TrackPage from "./TrackPage";
import GenrePage from "./GenrePage";
import VideoPage from "./VideoPage";
import SearchPage from "./SearchPage";
import PreniumPage from "./PreniumPage";

function TrangChu() {
    // Lấy toàn bộ đường dẫn
    const location = useLocation(); 
    // Tách URL theo dấu "/" và lấy page cần render
    const page = location.pathname.split("/")[1]; 


    const getPage = () => {
        switch (page) {
            case "playlist":
                return <PlaylistPage />
            case "favorite":
                return <FavoritePage />
            case "track":
                return <TrackPage />
            case "genre":
                return <GenrePage />
            case "video":
                return <VideoPage />
            case "search":
                return <SearchPage />
            case "prenium":
                return <PreniumPage />
            default:
                return <HomePage />
        }
    };


    return (
        <div className="TrangChu">
            <div className="TrangChu_main">
                {getPage()}
            </div>
            <Footer />
        </div>
    )
}

export default TrangChu;