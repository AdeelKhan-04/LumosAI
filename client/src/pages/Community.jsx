import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  // Fetch community creations
  const fetchCreations = async () => {
    try {
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const imageLikeToggle = async (id) => {  
      try {  
          const { data } = await axios.post('/api/user/toggle-like-creation', { id }, {  
              headers: { Authorization: `Bearer ${await getToken()}` }  
          })  
  
          if (data.success) {  
              toast.success(data.message)  
              await fetchCreations()  
          } else {  
              toast.error(data.message)  
          }  
      } catch (error) {  
          toast.error(error.message)  
      }  
  }
  
  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  return !loading ? (
    <div className="min-h-screen bg-white py-10 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-4xl mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-1 drop-shadow-sm flex items-center justify-center gap-2">
          Community Creations
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          See what the community is creating with AI tools!
        </p>
      </div>

      {/* Community Creations Grid */}
      <div className="bg-white/80 rounded-2xl shadow-lg p-6 border border-gray-100 w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-blue-900 mb-6 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2"></span>
          Recent Community Creations
        </h2>

        {creations.length === 0 ? (
          <div className="text-center text-gray-400 py-10 text-lg">
            No community creations yet. Be the first to share your work!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creations.map((creation, index) => (
              <div
                key={index}
                className="relative group w-full overflow-hidden rounded-xl shadow-md border border-gray-100"
              >
                <img
                  src={creation.content}
                  alt=""
                  className="w-full h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex gap-2 items-end justify-end group-hover:justify-between p-4 bg-gradient-to-b from-transparent to-black/80 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm hidden group-hover:block max-w-[70%] truncate">
                    {creation.prompt}
                  </p>
                  <div className="flex gap-1 items-center">
                    <p>{creation.likes.length}</p>
                    <Heart
                      onClick={() => imageLikeToggle(creation.id)}
                      className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                        creation.likes.includes(user.id)
                          ? "fill-red-500 text-red-600"
                          : "text-white"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <span className="w-10 h-10 my-1 rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></span>
    </div>
  );
};

export default Community;