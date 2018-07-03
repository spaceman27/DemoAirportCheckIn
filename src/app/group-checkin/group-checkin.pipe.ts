import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'groupcheckinpipe',
    pure: false
})
export class GroupCheckInPipe implements PipeTransform {
    /* istanbul ignore next */
    transform(items: any[], args: string): any {
        let result = items;
        if (args) {
            result = items.filter(r => r.key.toLowerCase().indexOf(args.toLowerCase()) !== -1);
        }
        return result;
    }
}
