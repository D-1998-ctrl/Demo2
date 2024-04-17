import React, { useState, useEffect } from 'react';
import BoardsData from './boardsdata';
const Demo = () => {

    const [pipelines, setPipelines] = useState([]);

    
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch('http://127.0.0.1:8080/workflow/pipeline', requestOptions)
            .then((response) => response.json()) // Parse response as JSON
            .then((result) => setPipelines(result.pipeline)) // Update state with pipeline data
            .catch((error) => console.error('Error fetching pipeline data:', error));
    }, []); // Empty dependency array ensures this effect runs only once




const pipelinesData=[

]


  return (
    <div>
            {pipelines.map((pipeline) => (
                <div key={pipeline._id}>
                    
                  
                        {pipeline.stages.map((stage) => (
                       
                            <td key={stage._id}>{stage.name}</td>
                        ))}
                    
                </div>
            ))}
        </div>
  )
}

export default Demo