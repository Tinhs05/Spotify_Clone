import { createContext, useState, useContext, useRef, useEffect } from "react";
import { Modal } from "antd";

// Tạo Context
const TrackContext = createContext();


// Provider để bọc toàn bộ ứng dụng
export function TrackProvider({ children }) {
    const [trackInfo, setTrackInfo] = useState(() => {
        const saved = localStorage.getItem("trackInfo");
        return saved ? JSON.parse(saved) : {};
    });
    const [isPlaying, setIsPlaying] = useState(false);
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        try {
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed && parsed.id) return parsed;
            }
        } catch (e) {}
        return null;
    });
    const [isModalOpen, setIsModalOpen] = useState(false);



    useEffect(() => {
        if (trackInfo) {
            localStorage.setItem("trackInfo", JSON.stringify(trackInfo));
        }
    }, [trackInfo]);

    useEffect(() => {
        if (user && user.id) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);


    return (
        <TrackContext.Provider 
            value={{ 
                trackInfo ,setTrackInfo, 
                isPlaying, setIsPlaying, 
                user, setUser,
                isModalOpen, setIsModalOpen
            }}
        >
            {children}
            <Modal 
                className="modal-prenium-inform"
                open={isModalOpen} 
                onCancel={() => setIsModalOpen(false)} 
                onOk={() => window.location.href = `/prenium/${user.id}`}
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