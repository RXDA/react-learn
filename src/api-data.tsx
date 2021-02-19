import React, {useEffect, useState} from "react";

interface weatherData {
    "success": string,
    "result": {
        "weaid": string,
        "days": string,
        "week": string,
        "cityno": string,
        "citynm": string,
        "cityid": string,
        "temperature": string,
        "temperature_curr": string,
        "humidity": string,
        "aqi": string,
        "weather": string,
        "weather_curr": string,
        "weather_icon": string,
        "weather_icon1": string,
        "wind": string,
        "winp": string,
        "temp_high": string,
        "temp_low": string,
        "temp_curr": string,
        "humi_high": string,
        "humi_low": string,
        "weatid": string,
        "weatid1": string,
        "windid": string,
        "winpid": string,
        "weather_iconid": string
    }
}

interface WeatherState {
    error: any
    isLoaded: boolean
    data?: weatherData
}


export class Weather extends React.Component<{}, WeatherState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        }
    }

    componentDidMount() {
        fetch("http://api.k780.com/?app=weather.today&weaid=1&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        console.log(this.state)
        const {error, isLoaded, data} = this.state
        if (error) {
            return <div>Error: {error}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            if (data) {
                return (
                    <div>
                        <p>北京当前天气:{data.result.weather}</p>
                        <img src={data.result.weather_icon} alt="a"/>
                        <p>气温:{data.result.temperature}</p>
                    </div>
                );
            } else {
                return <div>Loading...</div>;
            }
        }
    }
}

export const WeatherHook = () => {
    const [err, setErr] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState<weatherData>();

    useEffect(() => {
        fetch("http://api.k780.com/?app=weather.today&weaid=1&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    setData(result)
                },
                (error) => {
                    setIsLoaded(true)
                    setErr(error)
                }
            )
    }, [])

    if (err) {
        return <div>Error: {err}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        if (data) {
            return (
                <div>
                    <p>北京当前天气:{data.result.weather}</p>
                    <img src={data.result.weather_icon} alt="a"/>
                    <p>气温:{data.result.temperature}</p>
                </div>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
}
