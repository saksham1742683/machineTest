
import { useDispatch } from "react-redux";
import { removePost } from "../redux/postsSlice";
import { FaTimes } from "react-icons/fa";

const Card = ({ id, title, body, userId }) => {
  const dispatch = useDispatch();

  return (
    <div className=" relative p-4 shadow-lg rounded-sm w-52 bg-white">
      <button
        onClick={() => dispatch(removePost(id))}
        className="  absolute top-2 right-2  text-red-500 hover:text-red-700 font-bold "
      >
        <FaTimes />
      </button>
      <h2 className="font-bold text-lg mb-2 truncate mt-4">{title}</h2>
      <p className="text-gray-700 mb-2 line-clamp-2">{body}</p>
      <p className={"font-bold text-[10px] text-gray-400 line-clamp-1"}>{new Date().toString()}</p>

      <img
        className=" w-full h-20 object-cover"
        src="/images/img1.png"
        alt=""
      />

    </div>
  );
};

export default Card;
