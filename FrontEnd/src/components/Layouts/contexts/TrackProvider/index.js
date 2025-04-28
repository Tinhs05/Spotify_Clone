import { createContext, useState, useContext, useRef, useEffect } from "react";
import { Modal } from "antd";

// Tạo Context
const TrackContext = createContext();

// Provider để bọc toàn bộ ứng dụng
export function TrackProvider({ children }) {
    const [trackInfo, setTrackInfo] = useState(() => {
        const saved = localStorage.getItem("trackInfo");
        console.log(">>> trackInfo: ", JSON.parse(saved))
        return saved ? JSON.parse(saved) : {};
    });
    const [isPlaying, setIsPlaying] = useState(false);
    const [isClick, setIsClick] = useState(null);
    const [isClickPlaylist, setIsClickPlaylist] = useState({});
    const [user, setUser] = useState({
        id: 1,
        username: 'Trần Văn A',
        image_file_path: null,
        email: 'tranvana@gmail.com',
        password: '123456',
        profile_image_path: null,
        isPremium: 0
    });
    const [isModalOpen, setIsModalOpen] = useState(false);



    useEffect(() => {
        if (trackInfo) {
            localStorage.setItem("trackInfo", JSON.stringify(trackInfo));
        }
    }, [trackInfo]);


    return (
        <TrackContext.Provider 
            value={{ 
                trackInfo ,setTrackInfo, 
                isPlaying, setIsPlaying, 
                isClick, setIsClick,
                isClickPlaylist, setIsClickPlaylist,
                user, setUser,
                isModalOpen, setIsModalOpen
            }}
        >
            {children}
            <Modal 
                className="modal-prenium-inform"
                open={isModalOpen} 
                onCancel={() => setIsModalOpen(false)} 
                width={600}
                centered
            >
                <h2>Nâng cấp lên Premium ?</h2>
                <br/>
                <p>Nâng cấp lên Premium để nghe chọn bài hát</p>
            </Modal>
        </TrackContext.Provider>
    );
}

// Hook để sử dụng context trong component khác
export function useTrack() {
    return useContext(TrackContext);
}