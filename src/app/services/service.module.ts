import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { PlayService } from './play.service';
import { FileService } from './file.service';
@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [AuthService, UserService, PlayService, FileService],
})
export class APIModule {}
