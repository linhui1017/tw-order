
const stationList=['南港', '台北', '板橋', '桃園' ,'新竹' ,'苗栗' ,'台中' ,'彰化' ,'雲林' ,'嘉義', '台南', '左營']
const toTimeList = {
'00:00':'1201A','00:30':'1230A','05:00':'500A','05:30':'530A','06:00':'600A','06:30':'630A',
'07:00':'700A','07:30':'730A','08:00':'800A','08:30':'830A','09:00':'900A','09:30':'930A',
'10:00':'1000A','10:30':'1030A','11:00':'1100A','11:30':'1130A','12:00':'1200N','12:30':'1230P',
'13:00':'100P','13:30':'130P','14:00':'200P','14:30':'230P','15:00':'300P','15:30':'330P',
'16:00':'400P','16:30':'430P','17:00':'500P','17:30':'530P','18:00':'600P','18:30':'630P',
'19:00':'700P','19:30':'730P','20:00':'800P','20:30':'830P','21:00':'900P','21:30':'930P',
'22:00':'1000P','22:30':'1030P','23:00':'1100P','23:30':'1130P',
};
const ticketAmountList ={
  '1':'1F',  '2':'2F',  '3':'3F',  '4':'4F',
}
const reloadTime =5000;
var timeoutID =0;
var tkIndex = 0;
const order_info ={
  'selectStartStation' : '嘉義',
  'selectDestinationStation' : '台北',
  'section_subtitle':'#bookingMethod_0', //直接輸入車次號碼:#bookingMethod_1, 依時間搜尋合適車次:#bookingMethod_0
  'toTimeInputField':'2022/06/05',
  'toTimeTable':'15:00',
  'toTrainIDInputField':'850',
  'ticketAmount':'1',
  'idNumber':'F125488195',
  'mobilePhone':'0932258832',
  'name2622':'s9043044@gmail.com',
  'msNumber':'F125488195',
  'toTrainIDs':['850', '850', '850'],
}
let setPage1Data = ()=> {
 let selectStartStation = $('select[name="selectStartStation"]')
 let selectDestinationStation =  $('select[name="selectDestinationStation"]')
 selectStartStation.val(stationList.indexOf(order_info['selectStartStation'])+1);
 selectDestinationStation.val(stationList.indexOf(order_info['selectDestinationStation'])+1);
 //時間
 let toTimeInputField = $('#toTimeInputField');
 toTimeInputField.val(order_info['toTimeInputField']);
 //訂位方式
 let bookingMethod = $(order_info['section_subtitle'])
 bookingMethod.click();
  //直接輸入車次號碼:#bookingMethod_1
 if(order_info['section_subtitle'] === '#bookingMethod_1')
 {
    let toTrainIDInputField = $('input[name="toTrainIDInputField"]')
    //toTrainIDInputField.val(order_info['toTrainIDInputField']);
    toTrainIDInputField.val(order_info['toTrainIDs'][2]);
 }
 if(order_info['section_subtitle'] === '#bookingMethod_0')
 {
    let toTimeTable = $('select[name="toTimeTable"]')
    toTimeTable.val(toTimeList[order_info['toTimeTable']]);
 }
 //票數
 let ticketAmount = $('select[name="ticketPanel:rows:0:ticketAmount"]')
 ticketAmount.val(ticketAmountList[order_info['ticketAmount']]);
};
let startRun = ()=> {
  let SubmitButton = $('#SubmitButton');
  let onPage1 = SubmitButton && SubmitButton.attr("value")==='開始查詢';
  let securityInput = $('input[name="homeCaptcha:securityCode"]')[0];
 
  if(onPage1 && securityInput)
  {
    console.log(1,'開始查詢');
    clearTimeout(timeoutID);
    if(securityInput.value && securityInput.value.length === 4)
    {
      setPage1Data();
      let SubmitButton = $('#SubmitButton');
      if(SubmitButton && SubmitButton.attr("value")==='開始查詢')
       {
          SubmitButton.click();
       }
    }
    else
    {
      console.log(0, 'restart');
      timeoutID = window.setTimeout(startRun, reloadTime);
    }
  }
};
let page1exe = ()=> {
  timeoutID = window.setTimeout(startRun, reloadTime);
};
let page2exe = ()=> {
  let comformButton = $('input[name="SubmitButton"]')
  if(comformButton && comformButton.attr("value")==='確認車次')
  {
    console.log(2, 'into page2');
    comformButton.click();
  }
};
let page3exe = ()=> {
  let isSubmit = $('#isSubmit')
  if(isSubmit && isSubmit.attr("value")==='完成訂位')
  {
    console.log(3, 'into page3')
    let idNumber = $('#idNumber');
    idNumber.val(order_info['idNumber']);
  
    let mobilePhone = $('#mobilePhone');
    mobilePhone.val(order_info['mobilePhone']);
    
    let name2622 = $('#name2622');
    name2622.val(order_info['name2622']);
    
     //let memberSystemCheckBox = $('#memberSystemCheckBox');
     //memberSystemCheckBox.click();
     //let msNumber = $('#msNumber');
     //msNumber.val(order_info['msNumber']);
     let agree = $('input[name="agree"]');
     agree.click();
     isSubmit.click();
  {
}
  }
};

let run = ()=> {
  //直接輸入車次號碼:#bookingMethod_1
  if(order_info['section_subtitle'] === '#bookingMethod_1')
  {
    page3exe();
  }
  if(order_info['section_subtitle'] === '#bookingMethod_0')
  {
    page3exe();
    page2exe();
  }
  page1exe();
}

run();




