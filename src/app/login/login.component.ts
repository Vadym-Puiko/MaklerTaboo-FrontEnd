import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {User} from '../shared/interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(user).subscribe((res) => {
      localStorage.setItem('token', res.headers.get('accesstoken'));
      localStorage.setItem('user', JSON.stringify(res.body));
      this.loginForm.reset();
        this.router.navigate(['/flats']);
    });
  }
}
