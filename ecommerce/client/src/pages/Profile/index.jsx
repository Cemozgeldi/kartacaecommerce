import React, { useEffect } from "react";
import { useAuth } from "../../contexts/Auth.Context";
import { Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    logout(() => {
      navigate("/");
    });
  };
  useEffect(() => {
    if (!user) {
      // Eğer kullanıcı oturum açmamışsa, ana sayfaya yönlendirir
      navigate("/");
    }
  }, [user, navigate]);
  if (!user) {
    return null;
  }
  return (
    <div>
      <Text fontSize={22}>profile</Text>
      <code>{JSON.stringify(user)}</code>
      <Button colorScheme="pink" variant="solid" onClick={handleLogOut}>
        Log Out
      </Button>
    </div>
  );
};

export default Profile;
