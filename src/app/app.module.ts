import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { DepositPageComponent } from './components/wallet/deposit/deposit-page/deposit-page.component';
import { WithdrawPageComponent } from './components/wallet/withdraw/withdraw-page/withdraw-page.component';
import { TransactionPageComponent } from './components/wallet/transaction/transaction-page/transaction-page.component';
import { WishlistPageComponent } from './components/wishlist/wishlist-page/wishlist-page.component';
import { WishlistpageService } from './services/wishlistpage.service';
import { AllfundsComponent } from './components/allfunds/allfunds.component';
import {HttpClientModule}  from '@angular/common/http';
import { AllfundsdetailComponent } from './components/allfundsdetail/allfundsdetail.component';
import { FooterComponent } from './components/footer/footer.component'
import { WalletService } from './services/wallet.service';
import { ApiService } from './services/api.service';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { InvestNowComponent } from './components/invest-now/invest-now.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { BuyingComponent } from './components/buying/buying.component';
import { SipComponent } from './components/sip/sip.component';
import { FaqComponent } from './components/faq/faq.component';
import { MutualFundDetailsComponent } from './components/mutual-fund-details/mutual-fund-details.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { Searchbox2Component } from './components/searchbox2/searchbox2.component';
import { PaymentoptionComponent } from './components/paymentoption/paymentoption.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { VarifyotpComponent } from './components/varifyotp/varifyotp.component';
import { SendOtpComponent } from './components/send-otp/send-otp.component';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';


var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

// const loadingConfig : NgxUiLoaderConfig ={
// httpTimeout:3000,
// };
export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    WalletComponent,
    DepositPageComponent,
    WithdrawPageComponent,
    TransactionPageComponent,
    WishlistPageComponent,
    AllfundsComponent,
    AllfundsdetailComponent,
    FooterComponent,
    CanvasJSChart,
    CurrencyConverterComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    SearchBoxComponent,
    AccountDetailsComponent,
    DashboardHomeComponent,
    ErrorPageComponent,
    InvestNowComponent,
    NavbarComponent,
    PortfolioComponent,
    BuyingComponent,
    SipComponent,
    FaqComponent,
    MutualFundDetailsComponent,
    ThankyouComponent,
    Searchbox2Component,
    PaymentoptionComponent,
    ForgotpasswordComponent,
    VarifyotpComponent,
    SendOtpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    NgxUiLoaderModule,
    // NgxUiLoaderHttpModule.forRoot({
    //   showForeground:true,
    //   minTime:300,
    //   excludeRegexp:[
    //     '/mutualfund/search'
    //   ]
    // })

  ],
  providers: [WishlistpageService,
  WalletService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
