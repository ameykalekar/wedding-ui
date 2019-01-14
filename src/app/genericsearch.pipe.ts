import { Pipe, PipeTransform } from '@angular/core';
import { ProfileVo } from './vo/profile-vo';

@Pipe({
  name: 'genericsearch'
})
export class GenericsearchPipe implements PipeTransform {

  transform(profiles: ProfileVo[], search: string): ProfileVo[] {
    if (search.length > 0) {
      return profiles.filter(p => {
        if (p.firstName.search(search) != -1) {
          return p;
        }

      });

    } else {
      return profiles;
    }
  }

}
