import React, {useEffect, useState} from 'react';

interface Verdict {
    celsius: number
}

const BoilingVerdict = (props: { celsius: number }) => {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

const Calculator = () => {
    const [temperature, setTemperature] = useState('')
    return (
        <fieldset>
            <legend>Enter temperature in Celsius:</legend>
            <input
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}/>
            <BoilingVerdict
                celsius={parseFloat(temperature)}/>
        </fieldset>
    )
}

