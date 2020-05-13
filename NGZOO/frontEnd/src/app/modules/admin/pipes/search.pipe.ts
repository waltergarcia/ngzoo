import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'search'})
@Injectable()
export class SearchPipe implements PipeTransform{

  transform(items: any, word: any){
    if(word === undefined){
      return items;
    }

    return items.filter((item) => {
      return item.name.toLowerCase().includes(word.toLowerCase());
    });
  }
}
