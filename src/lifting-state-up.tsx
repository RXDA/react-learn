import React, {useEffect, useState} from 'react';


const BoilingVerdict = (props: { celsius: number }) => {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

const scaleNames: { [key: string]: string } = {
    c: 'Celsius',
    f: 'Fahrenheit',
}

interface TemperatureInputProp {
    scale: string
    temperature: string

    onTemperatureChange(value: string): void;
}


const TemperatureInput = (props: TemperatureInputProp) => {
    return (
        <fieldset>
            <legend>Enter temperature in {scaleNames[props.scale]}:</legend>
            <input
                value={props.temperature}
                onChange={(e) => props.onTemperatureChange(e.target.value)}/>
        </fieldset>
    )
}


function toCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius: number): number {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature: string, convert: (_: number) => number): string {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

type calculatorInput = {
    scale: string
    temperature: string
}

export const Calculator = (props: calculatorInput) => {
    const [state, setState] = useState({scale: 'c', temperature: ''})
    const scale = state.scale;
    const temperature = state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
        <div>
            <TemperatureInput
                scale='c'
                temperature={celsius}
                onTemperatureChange={(t) => setState({scale: 'c', temperature: t})}
            />
            <TemperatureInput
                scale='f'
                temperature={fahrenheit}
                onTemperatureChange={(t) => setState({scale: 'f', temperature: t})}
            />
            <BoilingVerdict
                celsius={parseFloat(celsius)} />
        </div>
    )
}

