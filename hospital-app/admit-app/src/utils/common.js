
export const checkToken=()=>{
    const token = localStorage.getItem('token');
    if (token==null) {
      return false;
    }
    return true;
}

export const checkUser=(user)=>{
  const usertype = localStorage.getItem('user');
    if (usertype !== user) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('account');
    }
}

export const dateFormat = (date) => {
  const dateStr = date;
  const dateObj = new Date(dateStr);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const formattedDate = `${day}-${month}-${dateObj.getFullYear()}`;
 return(formattedDate);
}
// const navigate = useNavigate();
// useEffect(() => {
//   const isTokenPresent = checkToken();
//   if (!isTokenPresent) {
//     navigate('/');
//   }
// }, [navigate]);
