import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Course, EnumLearningMode } from '../../models/course.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../service/CourseService';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { categoryService } from '../../service/category.service';
import { Lecturer } from '../../models/lecturer.model';
import { LecturerService } from '../../service/lecturer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-course',
  templateUrl:'./add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourse implements OnInit{
  categorys:Category[]=[];
  lecturers:Lecturer[]=[];
  isEdit:boolean=false;
  course:Course;
  // syl;
  // showSiblings: boolean = false;

  // @Output() courseAdded = new EventEmitter<Course>();
   regex: RegExp = /^[A-Z]/;
  courseForm: FormGroup = new FormGroup({

    "name": new FormControl("", [Validators.required,Validators.pattern(this.regex)]),
    "category": new FormControl("", [Validators.required]),
    "lessonsNumber": new FormControl("", [Validators.required]),
    "startDate": new FormControl("", [Validators.required]),
    // "syllbus": new FormControl(""),//, [Validators.required]),
    "lernningMode": new FormControl("", [Validators.required]),
    "picture": new FormControl("", [Validators.required]),
    "lecturerId": new FormControl("", [Validators.required]),
    // "syllabus": this.fb.array([this.createSibling()]),
  })
  inputs: string[] = [" "];
  onInput(event: Event, index: number): void {
   
    const target = event.target as HTMLInputElement;
    const value = target.value.trim();

    if (value && index === this.inputs.length-1 ) {
      this.inputs.push(value);
    } 
    // else if(index<this.inputs.length - 1)
    //           this.inputs[index]=value;
    else if (!value && index < this.inputs.length - 1) {
      this.inputs.splice(index + 1, 1);
     }
  //   this.l=this.inputs.length;
     //else if(value){ this.inputs[index]=value}
    console.log(this.inputs)
  }
  // course: Course;
  modes=Object.values(EnumLearningMode);
  constructor(private _srv: CourseService, private _r: Router,private _ctgS :categoryService,private _ls:LecturerService,private fb:FormBuilder,private l :Location,private _route:ActivatedRoute) {
    if (l.path().includes("editcourse")) {
      this.isEdit = true;
      this._route.params.subscribe(params => {
        _srv.getCourseFromServerById(params['id']).subscribe(x=>{this.course=x});
       this.inputs=this.course.syllabus;
      })
      //למצוא דרך למלא את השדות בטופס!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // this.courseForm.value.name=this.course.name;
      // this.courseForm.value.Category=this.course.categoryId;
      // this.courseForm.value.picture=this.course.image;
      // this.courseForm.value.lernningMode=this.course.learningMode;
      // this.courseForm.value.lecturerId=this.course.lecturerId;
      // this.courseForm.value.lessonsNumber=this.course.numberOfLessons;
      // this.courseForm.value.startDate=this.course.startDate;
      // this.courseForm.value.syllabus=this.course.syllabus;
   }
  }
  ngOnInit(): void {
    this._ctgS.getCategoriesFromServer().subscribe(data=>{
      this.categorys=data;
    })
    this._ls.getLecturersFromServer().subscribe(data=>{
      this.lecturers=data;
    })
    
// this.syl=this.courseForm.get('syllabus') as FormArray;
  }
  onCancle(){
    this._r.navigate(['/allcourses']);
  }
  onSubmit() {
    if (this.courseForm.invalid) {
      return;
    }

    // Create a new user object with form values
    let newCourse;
    newCourse = {
      id: 0,
      name: this.courseForm.value.name,
      categoryId: this.courseForm.value.category,
      numberOfLessons: this.courseForm.value.lessonsNumber,
      startDate: this.courseForm.value.startDate,
      syllabus: this.inputs.splice(0,1),
      learningMode: this.courseForm.value.lernningMode,
      lecturerId: JSON.parse(sessionStorage.getItem("lecturer")).id,
      image: this.courseForm.value.picture,
    };

     console.log('New c:', newCourse);
    // this.users.push(newCourse);
    if(this.isEdit)
    this._srv.edit(this.course.id,newCourse);//למה לא עובד?
    else
    this._srv.saveNewCourse(newCourse);//למה לא עובד?
  this._r.navigate(["/allcourses"]);
  alert("course Added Successfully!!!")

    // Optionally, you can reset the form after submission
    this.courseForm.reset();
   
  }

  
}


