const logout = () => {
  localStorage.removeItem("token");
  // Optionally redirect to login page
  navigate("/login");
};
