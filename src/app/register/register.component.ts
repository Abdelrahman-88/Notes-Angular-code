import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  myStyle: object = {};
	myParams: any = {};
	width: number = 100;
	height: number = 100;

  error: string = "";

  registerForm: FormGroup = new FormGroup({
    "first_name": new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    "last_name": new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    "email": new FormControl(null, [Validators.email, Validators.required]),
    "age": new FormControl(null, [Validators.min(16), Validators.max(80), Validators.required]),
    "password": new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)])
  })

  constructor(private _AuthService: AuthService, private _Router: Router, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.myParams = {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffdf4a"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffdf4a",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    }

  }

  submitRegisterForm(registerForm: FormGroup) {
    this.spinner.show();
    if (registerForm.valid) {
      this._AuthService.register(registerForm.value).subscribe((response) => {
        if (response.message == "success") {
          this.spinner.hide();
          this.toastr.success('Success!', "",{positionClass:'toast-bottom-right',timeOut: 1000});
          this._Router.navigate(["/login"]);
        }
        else {
          this.spinner.hide();
          this.error = response.errors.email.message;
          this.toastr.error(`${this.error}!`, "",{positionClass:'toast-bottom-right',timeOut: 5000});
          
        }
      })
    }
  }

}
