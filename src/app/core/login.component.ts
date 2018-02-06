import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Session } from 'app/shared/session.model';
import { SessionService } from 'app/shared/session.service';

@Component({
  selector: 'gsa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit() {}

  login() {
    const session: Session = {
      isAuthenticated: true,
      role: this.username === 'admin' ? 'admin' : 'user',
      userId: 10
    };

    const destinationUrl = session.role === 'admin' ? '/admin' : '/user';

    this.sessionService.setSession(session);

    this.router.navigate([destinationUrl]);
  }
}
