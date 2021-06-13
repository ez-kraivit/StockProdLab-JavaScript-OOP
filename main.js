const FileClass = require('./plugins/FileClass');
const Service = require('./config/service.json')
const echo = (data) => console.log(data)
const main = async () =>{
    const data = {
        date_time:new Date(new Date().toLocaleDateString({timeZone:Service.timeZone})).toISOString(),
        name:"Pig",
        price:459,
        amount:200
    }
    FileClass.InsertFile('./databases/orders.json',data,FileClass.WriteFile)
}

main()