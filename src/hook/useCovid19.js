import React, { useState, useEffect } from 'react';
import axios from 'axios';
function useCovid19() {
    const [count, setCount] = useState(0);
    const [die, setDie] = useState([]);
    const [recove, setRecove] = useState([]);
    useEffect(() => {
        axios
            .get("https://api.covid19api.com/summary")
            .then(function (response) {
                // handle việc lấy dữ liệu thành công
                setCount(response.data);
            })
            .catch(function (error) {
                // handle lỗi
                console.log(error);
            });
        axios
            .get("https://api.covid19api.com/total/country/united-states/status/deaths?from=2020-03-30T00:00:00Z&to=2020-04-10T00:00:00Z")
            .then(function (response) {
                // handle việc lấy dữ liệu thành công
                setDie(response.data);
            })
            .catch(function (error) {
                // handle lỗi
                console.log(error);
            });
        axios
            .get("https://api.covid19api.com/total/country/united-states/status/recovered?from=2020-03-30T00:00:00Z&to=2020-04-10T00:00:00Z")
            .then(function (response) {
                // handle việc lấy dữ liệu thành công
                setRecove(response.data);
            })
            .catch(function (error) {
                // handle lỗi
                console.log(error);
            });
    }, [])

    return [count, die, recove];
}
export default useCovid19;