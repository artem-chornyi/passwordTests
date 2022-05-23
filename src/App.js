import {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import txt from './test.txt'



function App() {
    const [conditions, setConditions] = useState([]);

    useEffect(() => {
        function readTextFile(file) {
            const rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function () {
                if(rawFile.readyState === 4) {
                    if(rawFile.status === 200 || rawFile.status === 0) {
                        const allText = rawFile.responseText.split('\n').map(item => {
                            const modifiedValue = item.split(' ');

                            return {
                                symbol: modifiedValue[0],
                                requirements : modifiedValue[1].substring(0, modifiedValue[1].length - 1),
                                pasword: modifiedValue[2]
                            }
                        });
                        setConditions(allText);
                    }
                }
            }
            rawFile.send(null);
        }

        readTextFile(txt)
    }, [])

    const passwordTests = () => {
        return [...conditions]
            .map(test => {
                const {symbol, requirements, pasword} = test;
                const numberOfOccurrences = pasword.split(symbol).length - 1;
                // or (pasword.match(new RegExp(symbol, "g")) || []).length
                const minMax = requirements.split('-')

                return numberOfOccurrences >= minMax[0]
                    && numberOfOccurrences <= minMax[1]
            })
            .filter(test => !!test).length
    }


    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                
                <p>
                    Еotal correct passwords {conditions[0] && passwordTests()}
                </p>
            </header>
        </div>
    );
}


export default App;
