const path:string = window.location.href.split('/')[2]
const pathServer:string = path.split(':')[0]
console.log(path)
console.log("server dahsh", `${pathServer}:3000/dashboard` )

export const enviroment = {

    production:false,
    WSurl:`${pathServer}:3000`,
    HttpUrl:`http://${pathServer}:3000/dashboard`
    //HttpUrl:'https://api.openweathermap.org/data/3.0/onecall?lat=19.463897&lon=-99.246042&exclude=hourly,daily&appid=b12b389e1e6f9f56999f3a13d164c63d'

}


// export const enviroment = {

//     production:false,
//     WSurl:`${pathServer}:3000`,
//     HttpUrl:`${pathServer}:3000/dashboard`
//     //HttpUrl:'https://api.openweathermap.org/data/3.0/onecall?lat=19.463897&lon=-99.246042&exclude=hourly,daily&appid=b12b389e1e6f9f56999f3a13d164c63d'

// }