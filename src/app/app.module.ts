import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SocketService } from '../services/socket.service';
import { TimerDisplayComponent } from './timer-display/timer-display.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { NameFormComponent } from './name-form/name-form.component';
import { TextSpeakerComponent } from './text-speaker/text-speaker.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerDisplayComponent,
    PlayerListComponent,
    NameFormComponent,
    TextSpeakerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }