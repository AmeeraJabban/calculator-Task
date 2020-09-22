class CalculatorUI{
  constructor(){
    this.Engine;
    this.DisplayMessageEl;
  } 
  init=()=>{ 
    this.Engine=new CalculatorEngine();
    this.DisplayMessageEl=document.querySelector(".result"); 
    document.querySelector(".Equal").addEventListener("click",this.OnEqual_Click); 
    document.querySelector(".reset").addEventListener("click",this.OnReset_Click);  
    var NumbersEl= document.querySelectorAll(".Num");
    for(var i=0; i<NumbersEl.length; i++){
      NumbersEl[i].addEventListener("click",this.OnNumbers_Click);  
    }       
    var OperatorEl=document.querySelectorAll(".Oper");
    for(var i=0; i<OperatorEl.length; i++){
      OperatorEl[i].addEventListener("click",this.OnOperator_Click); 
    }       
  }
  OnNumbers_Click=(e)=>{
    var text=this.Engine.SetNumbers(e.target.value);
    this.DisplayMessage(text);
  }
  OnOperator_Click=(e)=>{
    var text=this.Engine.SetOperator(e.target.value)
    this.DisplayMessage(text);
  }
  OnEqual_Click=()=>{
    var text=this.Engine.Calculate()
    this.DisplayMessage(text);
  }
  OnReset_Click=()=>{
    this.Engine.Reset();
    this.DisplayMessage('');
  }
  DisplayMessage=(Message)=>{
    this.DisplayMessageEl.innerHTML=Message;
  }
}
class CalculatorEngine{
  constructor(){
    this.FirstNum='';
    this.SecondNum='';
    this.Operator='';
    this.PutInSeconedNum=false;
  }
  SetNumbers=(Value)=>{  
    if(this.PutInSeconedNum){
      this.SecondNum+=Value;
      return this.SecondNum;
    }
    else{
      this.FirstNum+=Value;  
      return this.FirstNum;
    }
  }
  SetOperator=(Value)=>{
    this.Operator=Value;
    this.PutInSeconedNum=true;
    return this.Operator;
  }
  Calculate=()=>{
    this.FirstNum=parseInt(this.FirstNum);
    this.SecondNum=parseInt(this.SecondNum);
    var Result=0;
    switch (this.Operator){
      case "+":
        Result=this.FirstNum + this.SecondNum;
        break;
      case "-":
        Result=this.FirstNum - this.SecondNum;
        break;
      case "*":
        Result=this.FirstNum * this.SecondNum;
        break;
      case "/":
        Result=this.FirstNum / this.SecondNum;
        break;
    } 
    this.Reset();
    return Result;
  }  
  Reset=()=>{
    this.FirstNum="";
    this.SecondNum="";
    this.Operator="";
    this.PutInSeconedNum=false;
  }
}
var Calculator=new CalculatorUI();
document.onreadystatechange =()=>{
  if (document.readyState== "complete"){
    Calculator.init();
  }
} 