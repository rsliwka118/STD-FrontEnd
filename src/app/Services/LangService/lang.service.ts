import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  constructor(public translate: TranslateService) { 
    translate.setDefaultLang('pl');
  }
  
  useLanguage(language: string) {
    this.translate.use(language);
}
}
