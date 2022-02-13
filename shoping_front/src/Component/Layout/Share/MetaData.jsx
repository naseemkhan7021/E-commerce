import { Helmet } from 'react-helmet';

const Metadata = ({ title }) => {
     return (
          <Helmet>
               <title>{title} - Online Shoping</title>
          </Helmet>
     );
}

export default Metadata;
