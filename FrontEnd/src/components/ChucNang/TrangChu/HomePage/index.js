import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./HomePage.css";
import { PlayCircleFilled } from '@ant-design/icons';
import { Tooltip, Popconfirm } from "antd";
import GenreTracks from "./GenreTracks";
import VideoList from "./VideoList";
import { getGenresAPI } from '../../../../services/GenreAPI';

function HomePage() {
    const [genres, setGenres] = useState([]);

    // Mock database
    useEffect(() => {
        ( async () => { 
            const dataGenres =  await getGenresAPI();
            if(dataGenres.genres)
            {
                setGenres(dataGenres.genres);
                
            }
            else
            {
                console.log(dataGenres.error);
            }
        })();
    }, []);



    return (
        <div className="HomePage">
            <div className="wrap_genres">
                {
                    genres.length !== 0 ?
                    genres.map((item, index) => {
                        return <div className="genre">
                                    <div className="genre-title">
                                        <Link 
                                            to={`/genre/${item.id}`}
                                            style={{
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '25px'

                                            }}
                                        >
                                            {item.name}
                                        </Link>
                                        <Link 
                                            to={`/genre/${item.id}`}
                                            style={{
                                                color: '#b3b3b3',
                                                fontWeight: '500',
                                                fontSize: '14px',
                                                alignSelf: 'center',
                                                marginRight: '15px'
                                            }}
                                        >
                                            Hiện tất cả
                                        </Link>
                                    </div>
                                    <GenreTracks idGenre={item.id} nameGenre={item.name} />
                                </div>;
                    }) : ''
                }
            </div>

            <div className="wrap_videos">
                <div className="video-title">
                    <Link
                        to={`/video`}
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '25px'

                        }}
                    >
                        MV
                    </Link>
                    <Link 
                        to={`/video`}
                        style={{
                            color: '#b3b3b3',
                            fontWeight: '500',
                            fontSize: '14px',
                            alignSelf: 'center',
                            marginRight: '15px'
                        }}
                    >
                        Hiện tất cả
                    </Link>
                </div>
                <VideoList />
            </div>
        </div>
    )
}

export default HomePage;