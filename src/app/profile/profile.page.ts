import { Component} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage{

  user: string = 'Pankaj Chaudhary';
  userProfileImage: string = "https://jimswbckxyazqwvjqsdg.supabase.in/storage/v1/object/sign/roskilde-places/profile/profile_pic.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJyb3NraWxkZS1wbGFjZXMvcHJvZmlsZS9wcm9maWxlX3BpYy5qcGciLCJpYXQiOjE2MzU1MTI3MTYsImV4cCI6MTk1MDg3MjcxNn0.5J-VXL_WBI756lHgMfYoRMNobyXjVj7XRTRrnn9O1TM";
  constructor() { }

}
