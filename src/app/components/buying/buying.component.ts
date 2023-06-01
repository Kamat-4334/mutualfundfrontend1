
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.css']
})
export class BuyingComponent {
  fundDetails: any;
  amount: number = 0;
  orderDate: string = ''
  id: string | any = ''
  loading: boolean = false;
  unit: number = -1;
  success:boolean=false;
  constructor(private http: HttpClient, private route: ActivatedRoute, private api: ApiService, private loginService: LoginService,private router:Router) { }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.api.detailById(Number(this.id)).subscribe(data => {
      this.fundDetails = data[0]
      console.log(this.fundDetails)
    })
  }
  continue(amountRef:any) {
    this.amount=amountRef.value
    this.unit = Number(this.amount)/Number(this.fundDetails.currentPrice)
    document.getElementById('modalBtn')?.click()
  }
  buymethod() {
    this.loading = true


    this.http.post(`http://34.234.150.41:5151/transactions/updateportfolio?username=${this.loginService.getLoggedInUser()}&mutualFundsId=${this.id}&price=${this.amount}&unit=1`, {},{responseType:'text'}).subscribe((data) => {
      console.log(this.loginService.getLoggedInUser(),data)

      this.http.post(`http://34.234.150.41:5151/transactionhistory/insert?username=${this.loginService.getLoggedInUser()}&mutualFundsId=${this.id}&type=buy&price=${this.fundDetails.currentPrice}&unit=1`,{}).subscribe((res)=>
      {console.log(res)}
    )

      this.loading = false
      this.success=true
      // setTimeout(() => {
      //   this.success=false
      //   document.getElementById('modalclose')?.click()
      //   this.router.navigate(['dashboard'])
      // }, 2000);

    }, err => {
      console.log(err)
      this.loading = false
    })

  }



}
