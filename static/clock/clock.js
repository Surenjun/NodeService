const hourOne = document.querySelector(".hour-one"),
      hourTwo = document.querySelector(".hour-two"),
      minOne = document.querySelector(".min-one"),
      minTwo = document.querySelector(".min-two"),
      secOne = document.querySelector(".sec-one"),
      secTwo = document.querySelector(".sec-two");

class Clock {
    constructor(){
        this.getTime();
        this.init();
        this.refresh();
    }
    getTime(){
        const now = new Date();
        this.second = now.getSeconds() + "";
        if(this.second.length === 1){
            this.second = "0" +  this.second;
        }
        this.min = now.getMinutes() + "";
        if(this.min.length === 1){
            this.min = "0" +  this.min;
        }
        this.hour = now.getHours() + "";
        if(this.hour.length === 1){
            this.hour = "0" +  this.hour;
        }
        this.timeArr = [
            ...this.second.split(""),
            ...this.min.split(""),
            ...this.hour.split(""),
        ]
    }
    init(){
        const classArr = [
            "num-ten",
            "num-one","num-two",
            "num-three","num-four",
            "num-five","num-six",
            "num-seven","num-eight",
            "num-nine"];

        this.classArr = classArr;

        this.domArr = [secOne , secTwo ,minOne ,minTwo ,hourOne ,hourTwo];
        const timeArr = this.timeArr;

        this.initOne(secOne, this.timeArr[0] * 1);
        this.initTwo(secTwo, this.timeArr[1] * 1);

        this.initOne(minOne, this.timeArr[2] * 1);
        this.initTwo(minTwo, this.timeArr[3] * 1);

        const hourOneNum = this.timeArr[4] * 1,
              hourTwoNum = this.timeArr[5] * 1;

        if(hourOneNum === 2){
            this.initHourFour(hourTwo, hourTwoNum);
        }else{
            this.initTwo(hourTwo, hourTwoNum);
        }

        this.initHourTwo(hourOne, hourOneNum);
    }
    //0-6
    initOne(dom , number){
        dom.innerHTML = "";
        if(number >= 3){
            number -= 3
        }else{
            number += 4
        }
        for(let i = 0;i <= 6;i++){
            const oDiv = document.createElement("div");
            oDiv.style.opacity = -(12 / 200) *i*i  + (65 / 200)*i + 0.22;
            let key = number + i;
            if(key > 6) key -= 7;
            oDiv.className = "every" + " " + this.classArr[key];
            dom.appendChild(oDiv);
        }
        dom.style.marginTop = 60 + "px";
    }
    //0-9
    initTwo(dom , number){
        dom.innerHTML = "";
        if(number <= 3){
            number += 6
        }else{
            number -= 4
        }
        for(let i = 0;i <= 9;i++){
            const oDiv = document.createElement("div");
            oDiv.style.opacity = -(10 / 200) *i*i  + (88 / 200)*i + 0.11;
            let key = number + i;
            if(key > 9) key -= 10;
            oDiv.className = "every" + " " + this.classArr[key];
            dom.appendChild(oDiv);
        }
    }
    //0-4
    initHourFour(dom ,number){
        dom.innerHTML = "";
        if(number > 3){
            number -= 2
        }else{
            number += 3
        }
        for(let i = 0;i <= 4;i++){
            const oDiv = document.createElement("div");
            let key = number + i;
            if(key > 4) key -= 5;
            oDiv.className = "every" + " " + this.classArr[key];
            dom.appendChild(oDiv);
        }
        dom.style.marginTop = 120 + "px";
    }
    //0-2
    initHourTwo(dom ,number){
        dom.innerHTML = "";
        if(number > 1){
            number -= 1
        }else{
            number += 2
        }
        for(let i = 0;i <= 2;i++){
            const oDiv = document.createElement("div");
            oDiv.style.opacity = -(1 / 5) *i*i  + (90/ 200)*i + 0.5;
            let key = number + i;
            if(key > 2) key -= 3;
            oDiv.className = "every" + " " + this.classArr[key];
            dom.appendChild(oDiv);
        }
        dom.style.marginTop = 180 + "px";
    }
    refresh(){
        console.log(60 - (this.timeArr[0] + this.timeArr[1]) * 1);

        setInterval(()=>{
            this.getTime()
            this.initOne(secOne, this.timeArr[0] * 1);
            this.initTwo(secTwo, this.timeArr[1] * 1);
        },1000)

        setTimeout(()=>{
            this.initOne(minOne, this.timeArr[2] * 1);
            this.initTwo(minTwo, this.timeArr[3] * 1);

            setInterval(()=>{
                this.initOne(minOne, this.timeArr[2] * 1);
                this.initTwo(minTwo, this.timeArr[3] * 1);
            },1000 * 60)

        },1000 * (60 - (this.timeArr[0] + this.timeArr[1]) * 1));


    }

}
