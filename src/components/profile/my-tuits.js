// import {useEffect, useState} from "react";
// import * as service from "../../services/tuits-service";
// import Tuits from "../tuits";

// const MyTuits = () => {
//   const [tuits, setTuits] = useState([]);
//   const findMyTuits = () =>
//     service.findTuitsByUser("me")
//       .then(tuits => setTuits(tuits));
//   useEffect(findMyTuits, []);
//   const deleteTuit = (tid) =>
//     service.deleteTuit(tid)
//       .then(findMyTuits);
//   return(
//     <Tuits tuits={tuits}
//            deleteTuit={deleteTuit}/>
//   );
// };

// export default MyTuits;
import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";

const MyTuits = () => {
    const [tuits, setTuits] = useState([]);
    const findMyTuits = () =>
    {
        service.findTuitsByUser("me")
            .then(tuits => setTuits(tuits));
        
    }
    useEffect(findMyTuits, []);
    return(
        <div>
            <h1>
                My Tuits
            </h1>
                <Tuits tuits={tuits}
               refreshTuits={findMyTuits}/>
        </div>
        
    );
};

export default MyTuits;
