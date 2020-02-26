import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './Services/UserService/user.service';
import { LangService } from './Services/LangService/lang.service';
import { AngularBootstrapToastsModule } from 'angular-bootstrap-toasts';
import { Ng5SliderModule } from 'ng5-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './Components/Main/app/app.component';
import { NavComponent } from './Components/Main/nav/nav.component';
import { HomeComponent } from './Components/Other/home/home.component';
import { FooterComponent } from './Components/Main/footer/footer.component';
import { RegisterComponent } from './Components/Other/register/register.component';
import { LoginComponent } from './Components/Other/login/login.component';
import { MoviesComponent } from './Components/Other/movies/movies.component';
import { ErrorInterceptor } from './Interceptor/error.interceptor';
import { PageNotFoundComponent } from './Components/Other/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { DashboardGuard } from './Guards/dashboard.guard';
import { LoginGuard } from './Guards/login.guard';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        FooterComponent,
        RegisterComponent,
        LoginComponent,
        MoviesComponent,
        PageNotFoundComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        YouTubePlayerModule,
        FormsModule,
        AppRoutingModule,
        Ng5SliderModule,
        NgbModule,
        HttpClientModule,
        AngularBootstrapToastsModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        UserService,
        DashboardGuard,
        LoginGuard,
        LangService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }{
}


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }