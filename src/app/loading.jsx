import { ClipLoader } from "react-spinners";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader  color="#16b6e7" size={60} />
    </div>
  );
};

export default loading;