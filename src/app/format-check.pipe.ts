import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCheck'
})
export class FormatCheckPipe implements PipeTransform {

  transform(value: boolean): string {
    let retorno: string = '[   ]'
    if (value) retorno = '[ X ]'
    return retorno;
  }

}
