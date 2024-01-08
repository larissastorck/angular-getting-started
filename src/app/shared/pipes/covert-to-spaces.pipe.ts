import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'convertToSpaces',
  standalone: true
})
export class ConvertToSpacesPipe implements PipeTransform {
  transform(value: string, character: string) {
    return value.replaceAll(character, ' ');
  }
}
