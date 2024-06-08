import moment from'moment';

moment.locale('zh-cn');

const TimeFormat = {
   getTime:(date)=>{
      return moment(date).format('YYYY/MM/DD HH:mm:ss');
   }
}

export default TimeFormat;