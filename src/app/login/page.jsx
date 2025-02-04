import EnterToNeshan from "../components/EnterToNeshan/EnterToNeshan";
import { AxiosInterceptor } from "../adminPannelServices/http";
import "../globals.css";
export default function Login() {
  return (
    <AxiosInterceptor>
      <EnterToNeshan />
    </AxiosInterceptor>
  );
}
