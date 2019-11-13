import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../comments/comment';

@Pipe({
  name: 'tagfilter',
  pure: false
})
export class TagFilterPipe implements PipeTransform {
  transform(items: Comment[], filters: string[]): any {
    if (!items || !filters) {
      return items;
    }

    if (filters.length === 0) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out

    let filtered = [];
    // TODO: a more effecient way to do this than n^3

    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items[i].tags.length; j++) {
        for (let k = 0; k < filters.length; k++) {
          if (
            items[i].tags[j].name === filters[k] &&
            filtered.indexOf(items[i]) === -1
          ) {
            filtered.push(items[i]);
            break;
          }
        }
      }
    }
    return filtered;
  }
}
