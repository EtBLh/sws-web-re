const singerData = require('./singerData')

module.exports = function(){
    this.temp = {};
    let result= [0,0,0,0,0,0,0,0,0,0,0,0];
    this.show= () => {
        for (let i =1; i < result.length; i++){
            console.log(singerData[i-1]+": "+result[i]+"票")
        }
    };
    this.add= (object) => {
        result[object]+=1;
    }
}