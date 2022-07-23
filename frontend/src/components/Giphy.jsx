import React, {useEffect, useState} from 'react';
import axios from 'axios';


const Giphy = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const results = await axios("https://api.giphy.com/v1/gifs/search", {
                params: {
                    api_key: "IqzbfR9SrMYQLpCVsHtPdxpyG8XBJsim",
                    q: "meme"
                }
            });
            
            setData(results.data.data);
        };

        fetchData();
    }, []);

    const renderGIFS = () => {
        return data.map(el => {
            return (
                <div key={el.id} className="gif">
                    <img src={el.images.fixed_height.url}/>
                </div>
            )
        })
    }

    return <div className="gifContainer">(renderGIFS())</div>;
}

export default Giphy;