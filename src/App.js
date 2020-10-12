import React from "react";    //добавляем объект реакт из библиотеки ракт файл packagejson
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/Weather";

const API_KEY = "1e423cb69125688961af910a378d1c00"; //ключ API из сайта openweathermap

class App extends React.Component {   //создание компонента, extends - это унаследует из др класса

  state = {    //получение данных о погоде
    temp: undefined,  //температура
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
   e.preventDefault();   //остановка перезагрузки странички
   var city = e.target.elements.city.value; //переменная ввода города


   if(city) {    //проверка написано ли чтонибудь в ячейке город
    const api_url = await
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`); //прочитать url адрес и получить все данные с этой странички
    const data = await api_url.json();  //преображение инфы в json формат

    var sunset = data.sys.sunset;
    var date = new Date();
    date.setTime(sunset);  //отслеживание даты
    var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();  //перевод в нормальное время

    this.setState({   //установка значений о погоде
      temp: data.main.temp,  //смотрим значение в консоли браузера
      city: data.name,
      country: data.sys.country,
      pressure: data.main.pressure,
      sunset: sunset_date,
      error: undefined
    });
  } else {
    this.setState({   //установка значений о погоде
      temp: undefined,  //температура
      city: undefined,
      country: undefined,
      pressure: undefined,
      sunset: undefined,
      error: "Введите название города"
    });
  }
}

  render() {  //вывод информации (объединение всей информации)
    return (
      <div className="wrapper">
       <div className="main">
        <div className="container">
          <div className="row">
           <div className="col-sm-5 info">
             <Info />
           </div>
           <div className="col-sm-7 form">
             <Form weatherMethod={this.gettingWeather} />
             <Weather                                  //передача инфы о погоде в weather.js
               temp={this.state.temp}
               city={this.state.city}
               country={this.state.country}
               pressure={this.state.pressure}
               sunset={this.state.sunset}
               error={this.state.error}
             />
            </div>
           </div>
          </div>
         </div>
       </div>
    );
  }
}

export default App; //экспорт класса app
