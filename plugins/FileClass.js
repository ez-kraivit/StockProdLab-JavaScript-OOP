const Requires = require('./Requires')
module.exports.ThaiTime = new Date().toLocaleDateString({timeZone:Requires.Services.timeZone})
module.exports = class FileClass extends Requires.StockClass{
    constructor(){
    }
    static WriteFile=(path,data)=>{
        return Requires.fs.writeFileSync(path,JSON.stringify(data))
    }
    static ReadFile=(path,data,WriteFileBack,config='utf8')=>Requires.fs.readFile(path,config,(err,item)=>{
        try {
            item = JSON.parse(item)
            if(Object.keys(item).length<1) console.log('Not Found')
            if(!data){
                console.log(item)
            }  
        } catch (error) {
            return WriteFileBack(path,[{date_time:new Date(exports.ThaiTime).toISOString(),data:"Start"}])
        }
    })
    static InsertFile=(path,data,WriteFileBack,config='utf8')=>Requires.fs.readFile(path,config,(err,item)=>{
        try {
            item = JSON.parse(item)
            if(Object.keys(item).length<1||!data) console.log('Not Found')
            else{
                const FiltersData=Object.keys(item).map((file)=>{return item[file].name}).indexOf(data.name)
                if(FiltersData>-1) return console.log('Duplicate information')
                Array.prototype.push.apply(item,data)
                item.push(data)
                this.LogFile('./databases/logs.json',data)
                return WriteFileBack(path,item)
            }
        } catch (error) {
            return WriteFileBack(path,[{date_time:new Date(exports.ThaiTime).toISOString(),data:"Start"}])
        }
    })

    static LogFile=(path,data,config='utf8')=>Requires.fs.readFile(path,config,(err,item)=>{
        try {
            item = JSON.parse(item)
            Array.prototype.push.apply(item,data)
            item.push(data)
            return this.WriteFile('./databases/logs.json',item)
        } catch (error) {
            return this.WriteFile('./databases/logs.json',[{date_time:new Date(exports.ThaiTime).toISOString(),data:"Start"}])   
        }
    })
}