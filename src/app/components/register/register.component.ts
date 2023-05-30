import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
// import { Customer } from 'src/app/customer';
import { baseUrl } from 'src/app/config';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { from, last } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration.service';
import { User } from 'src/app/classes/user';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  searchTerm!: string;
  innerWidth: any;
  available!: any;
  // firstname:any;
  // lastname:any;
  // username:any;
  // Password:any;
  // confirm_password:any;
  userAvailable: boolean | null = null;
  registerForm!: FormGroup;
  submitted = false;
  loading = false;

  // registerForm = new FormGroup({
  //   firstname: new FormControl<string|null>(''),
  //   lastname: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  // });

  options: AnimationOptions = {
    path: '../../../assets/93385-login.json',
    autoplay: true,
    initialSegment: [80, 0],
  };
  animationCreated(animationCreated: AnimationItem) {
    console.log('animation crated');
    console.log(animationCreated);
    console.log(animationCreated.playSegments);
    animationCreated.firstFrame = 150;
    animationCreated.play();
    // animationCreated.setDirection(-1)
    console.log(this.registerForm);
  }
  constructor(
    public ro: Router,
    public http: HttpClient,

    private formBuilder: FormBuilder,
    private registration: RegistrationService,
    private router: Router
  ) {
    this.innerWidth = window.innerWidth;

    window.addEventListener('resize', () => {
      // console.log("width change")
      this.innerWidth = window.innerWidth;
    });
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[.,?!$&@%^*])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.MustMatch('password', 'confirmPassword') }
    );
  }

  // Varifyotp(){
  //     this.ro.navigate(['/varifyotp'])
  // }

  get form() {
    return this.registerForm.controls;
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formgroup: FormGroup) => {
      const control = formgroup.controls[controlName];
      const matchingControl = formgroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors?.['MustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  onSubmit() {
    this.loading = true;

    // if (this.registerForm.invalid) return;
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    // this.ro.navigate(['/varifyotp'])
    // alert("success")

    const userData = this.registerForm.value;
    const user = new User(
      userData.firstname,
      userData.lastname,
      userData.username,
      userData.password
    );

    console.log(this.registerForm);
    this.loading = true;
    this.registration.registerUser(user).subscribe(
      (res: any) => {
        // console.log(res)
        // this.registration.checkEmailExist(userData.username).subscribe((res)=>{

        // })
        this.loading = false;
        if (res.includes('Email Id:')) {
          const existEmail = res.split(':')[1].trim();
          alert(`This email ${existEmail}`);
          // alert(res);
        } else {
          this.router.navigate(['emailVerify', userData.username]);
        }
      },
      (error) => {
        // if(error.error && error.error.includes('Email Id:')[1].trim()){

        //   alert('this email ${existEmail} already exist!')
        // }
        // else{
        //   console.log("Regsitration failed!")
        // }

        console.log(error);
        this.loading = false;
      }
    );
  }
  passwordValidation(formgroup: FormGroup) {
    const passwordcon = formgroup.get('password');
    const confirmcon = formgroup.get('confirmPassword');
    if (passwordcon?.value !== confirmcon?.value) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
}
