import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'origin'
})
export class OriginPipe implements PipeTransform {
  transform(value: any,arg: any): any {
    const resultorders = [];

    function filtraracentos(texto:any){
      if (texto == null || texto == undefined) {
        return '';
      }
      else{
      texto = texto.toLowerCase();
      texto = texto.replace(new RegExp(/[áàâãª]/g),"a");
      texto = texto.replace(new RegExp(/[éèê]/g),"e");
      texto = texto.replace(new RegExp(/[íìî]/g),"i");
      texto = texto.replace(new RegExp(/[óòôõº]/g),"o");
      texto = texto.replace(new RegExp(/[úùû]/g),"u");
      texto = texto.replace(new RegExp(/[ç]/g),"c");
      texto = texto.replace(new RegExp(/[ñ]/g),"n");
      texto = texto.replace(new RegExp(/[ ]/g),"");
      return texto;
      }
    }




    for (const order of value) {
       

   if ( filtraracentos (order.origin).indexOf(filtraracentos(arg)) > -1  )



    {
        resultorders.push(order);

    }
      
    }






    return resultorders;
  }

  }





