
const Loader = ({ color }) => {
     return (
          <div className={`loader ${color ? color : 'loader-orange'}`}>

          </div>
     );
}

export default Loader;
