// format-feature-name.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFeatureName'
})
export class FormatFeatureNamePipe implements PipeTransform {

  transform(value: string): string {
    return value
      .replace('FEATURE_', '')
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

}
