import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { MathJaxDirective } from '../directives/MathJax.directive';
import { KatexDirective } from '../directives/Katex.directive';
import { KatexAutoDirective } from '../directives/KatexAuto.directive';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    MathJaxDirective,
    KatexDirective,
    KatexAutoDirective
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
