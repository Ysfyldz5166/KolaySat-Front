import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "./profileApi";



export function Profile() {
    const { id } = useParams(); // React Router'dan id parametresini al
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const response = await getUser(id); // API'den kullanıcı verilerini al
          setUser(response.data); // Kullanıcı verilerini state'e kaydet
          setLoading(false);
        } catch (error) {
          setError(error); // Hata durumunda hatayı state'e kaydet
          setLoading(false);
        }
      };
  
      fetchUser();
    }, [id]); // id değiştiğinde tekrar çağrılacak
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
      <div>
        {user && (
          <div>
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Diğer kullanıcı bilgilerini buraya ekleyebilirsiniz */}
          </div>
        )}
      </div>
    );
  }
  