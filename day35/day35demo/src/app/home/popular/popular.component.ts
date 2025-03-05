import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/Services/course.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent {

  router: Router = inject(Router)
  activeRoute: ActivatedRoute = inject(ActivatedRoute) // gives you information of the currently active route

  navigateToCourses() {
    this.router.navigate(['Courses'])
    // .navigate(['Courses', 'Learn', 'Java'])
    //  LH:4200/Courses/Learn/Java

    // another method is navigateByUrl()
    // this.router.navigateByUrl('Courses/Learn/Java')

    // These methods are all absolute path by default

    // for relative path
    // this.router.navigate(['Courses'], {relativeTo: this.activeRoute} )
  }

  courseService = inject(CourseService)
  popularCourses: Course[] = [];

  ngOnInit(){
    this.popularCourses = this.courseService.courses.filter(c => c.rating >= 4.5);
  }
}
