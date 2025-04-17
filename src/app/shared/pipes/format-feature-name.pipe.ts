import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFeatureName'
})
export class FormatFeatureNamePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value
      .replace('FEATURE_', '')          // Menghapus 'FEATURE_'
      .replace(/_/g, ' ')               // Mengubah underscore jadi spasi
      .toLowerCase()                    // Mengubah menjadi huruf kecil
      .replace(/\b\w/g, (match) => match.toUpperCase());  // Mengubah huruf pertama tiap kata menjadi kapital
  }
}
