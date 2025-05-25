import { useNavigate } from "react-router-dom";
const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full lg:w-72 sm:w-48 cursor-pointer hover:rounded-3xl  hover:scale-100 overflow-hidden rounded-xl 
    mb-1  shadow-lg bg-[#282828]"
      onClick={() => navigate(`/artist/${artist?._id}`)}
    >
      <img
        src={artist.avater.url}
        className="w-full lg:h-48 h-24 object-cover rounded-t-lg"
        alt="Album art"
      />
      <div className="lg:p-4 p-2">
        <h1 className="lg:text-2xl text-sm lg:font-bold">{artist.name}</h1>
        <p className="text-lg  hidden sm:block font-bold">{artist.bio} </p>
      </div>
    </div>
  );
};

export default ArtistCard;
