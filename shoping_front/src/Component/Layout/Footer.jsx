import { useLocation } from "react-router-dom";
import { MATCH_ADMIN } from "../../constants/variable";

const Footer = () => {
     const { pathname } = useLocation();
     const isMatch = MATCH_ADMIN.test(pathname);
     // console.log('isMatch -> ', isMatch, ' -> ', pathname);
     return (
          <>
               <footer className={`py-1 ${isMatch ? 'm-0' : ''}`}>
                    <p className="text-center mt-1">
                         Shopping Cart - 2019-2020, All Rights Reserved
                    </p>
               </footer>
          </>
     );
}

export default Footer;
