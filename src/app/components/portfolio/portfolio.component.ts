import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { WalletService } from 'src/app/services/wallet.service';
import { AllfundService } from 'src/app/services/allfund.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent {
  portfolio: any = [];

  userId: number | any;
  id: string | any = '';
  fundDetails: any;

  options: AnimationOptions = {
    path: '../../../assets/142582-money-growth.json',
  };

  constructor(
    private apiService: ApiService,
    private loginservice: LoginService,
    private walletservice: WalletService,
    private allfunds: AllfundService,
    private http: HttpClient,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {}

  getCurrentUser() {
    return this.loginservice.getLoggedInUser();
  }

  ngOnInit() {
    this.viewPortfolio();
  }
  viewPortfolio() {
    this.walletservice
      .finduserid(this.getCurrentUser())
      .subscribe((response: any) => {
        console.log(response);

        this.userId = response;

        console.log(this.userId);

        this.apiService.getPortfolio(this.userId).subscribe((res: any) => {
          console.log(res);

          this.portfolio = res;
          this.portfolio = this.portfolio.filter((data: any) => data.unit > 0);

          let allfundData: any | [];

          this.allfunds.getMutualFunds().subscribe((res) => {
            console.log(res);

            allfundData = res;

            this.portfolio = this.portfolio.map((data: any) => {
              // if (data?.unit<=0) this.portfolio.pop();
              let index = allfundData.findIndex(
                (fil: any) => fil.schemaId == data.mutualFundsId
              );

              let obj = { ...data, funds: { ...allfundData[index] } };
              return obj;
            });
            console.log('portfolio: ', this.portfolio);
          });

          console.log('unit=' + this.portfolio.unit);

          this.apiService.detailById(res.mutualFundsId).subscribe((res) => {
            console.log(res);
            return res;
          });
        });
      });
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  // getFundDetails(id: any) {

  // }
  sellMethod(fundId: number, price: number, unit: number) {
    this.ngxService.start()
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post(
        `http://34.234.150.41:5151/transactionhistory/insert?username=${this.getCurrentUser()}&mutualFundsId=${fundId}&type=sell&price=${price}&unit=${unit}`,
        { headers: headers },
        { responseType: 'text' }
      )
      .subscribe((res: any) => {
        // alert(res)
        console.log(res);

        this.ngxService.stop()
        Swal.fire({
          title: res === 'Data inserted successfully' ? 'You have sold!' : res,
          icon: res === 'Not enough units' ? 'warning' : 'success',

          showConfirmButton: true,

          confirmButtonText: 'Ok',

          confirmButtonColor: 'teal',
        }).then((result) => {
          if (result.value) {
            // this.router.navigate(['/portfolio']);
            // this.portfolio = [];
            this.viewPortfolio();
          }
        });
      });
  }
  lower(str: string) {
    return str?.split(' ')[0].toLowerCase();
  }

  sellMethod1(fundId: number, price: number, unit: number) {
    Swal.fire({
      title: 'Are you sure you wanna Sell!',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: 'red',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Ok',
      confirmButtonColor: 'teal',
    }).then((result) => {
      if (result.value) {
        if (result.isConfirmed) {
          this.sellMethod(fundId, price, unit);
        }
        if (result.isDenied) {
          this.router.navigate(['/dashboard/portfolio']);
        }
      }
    });
  }
}
