
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MutualFundService } from 'src/app/services/mutual-fund.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  fundsName:any[]=[]
  allTopData:any[]=[]
  allBottomData:any[]=[]
  constructor(private api:MutualFundService,private router:Router,private ngxService: NgxUiLoaderService) {

  }
  ngOnInit(){
    // this.ngxService.start()
    this.api.getData().subscribe((res)=>{
      this.allTopData = res;
      console.log(this.allTopData);
    },(err)=>{
      console.error(err)
    })

    this.api.getData1().subscribe((res) =>{
      this.allBottomData =res;
      console.log(this.allBottomData);
    },(err)=>{
      console.error(err)
    })
    // this.ngxService.stop()
  }

  toViewAllDetail(id:any){
    this.router.navigate(['dashboard/allfundsdetail/'+id])
  }

}

// import { Router } from '@angular/router';
// import { Component } from '@angular/core';
// import { MutualFundService } from 'src/app/services/mutual-fund.service';
// @Component({
//   selector: 'app-homepage',
//   templateUrl: './homepage.component.html',
//   styleUrls: ['./homepage.component.css']
// })
// export class HomepageComponent {
//   fundsName:any[]=[]
//   allTopData:any[]=[]
//   allBottomData:any[]=[]
//   constructor(private api:MutualFundService,private router:Router) {

//   }
//   ngOnInit(){
//     this.api.getData().subscribe((res)=>{
//       this.allTopData = res;
//       console.log(this.allTopData);
//     })

//     this.api.getData1().subscribe((res) =>{
//       this.allBottomData =res;
//       console.log(this.allBottomData);
//     })
//   }

//   toViewAllDetail(id:any){
//     this.router.navigate(['dashboard/allfundsdetail/'+id])
//   }

// }

