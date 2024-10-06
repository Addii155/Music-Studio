import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useSong } from '../store/song';
import like_icon from "../assets/like.png";
import like_heart from "../assets/like.svg";
import { onlikeClick } from '../store/song';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const MusicCard = ({ song }) => {

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { setSong } = useSong();
    const [liked, setLiked] = useState(false);
    const onClickHandler = () => {
        setSong(song);
    }

    const onLikeClick = () => {
        // console.log(user)
        if (!user) {
            navigate("/login");
            return;
        }
        if (liked) {
            setLiked(false);
            onlikeClick({ id: song._id });
            return;
        }
        setLiked(!liked);
        onlikeClick({ id: song._id });
    }
    return (
        <div className="lg:w-72 rounded-  hover:scale-105 rounded-xl my-2 overflow-hidden shadow-lg bg-[#282828]">
            <div className="relative ">
                <div className='w-full h-36'>
                    <img src={song?.thumbnail?.url}
                        alt="Album Art"
                        className="w-[100%] h-[100%] object-cover rounded"
                    />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                    <FaPlay className="text-white text-4xl"
                        onClick={onClickHandler}
                    />
                </div>
            </div>

            <div className="px-2 py-4">
                <div className='flex justify-end'>
                    <img
                        src={like_heart}
                        alt="like"
                        className={`w-6 h-6 ${liked ? 'block' : 'hidden'} cursor-pointer`} // Show when liked is true
                     onClick={onLikeClick}
                    />

                    {/* Second Image (Icon) */}
                    <img
                        src={like_icon}
                        alt="like"
                        className={`w-6 h-6 ${!liked ? 'block' : 'hidden'} cursor-pointer`} // Show when liked is false
                        onClick={() => {
                            onLikeClick();
                            setLiked(true);
                        }} // When clicked, change state to true
                    />
                </div>
                <div className=" text-md text-white  ">
                    {song.title}
                </div>
            </div>
        </div>
    );
};

export default MusicCard;