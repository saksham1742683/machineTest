import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/postsSlice";
import Card from "../components/Card";

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.posts);

  const [startupLoading, setStartupLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartupLoading(false)
      dispatch(fetchPosts());
    }, 5000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  // console.log(data);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  if(startupLoading){
    return(
      <div className="flex items-center justify-center h-screen text-2xl font-bold"> LOADING...</div>
    )
  }

  return (
    <div>
      <h1 className=" text-2xl font-extrabold items-center flex  justify-center mb-8">
        Posts
      </h1>
      {loading && (
        <p className=" flex justify-center font-semibold"> Loading...</p>
      )}
      {error && (
        <p className="text-red-600 flex justify-center font-semibold">
          {error}
        </p>
      )}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4   ">
          {data &&
            currentData.map((post) => (
              <Card
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                userId={post.userId}
              />
            ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {/* left  */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          &laquo;
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* right */}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Home;
