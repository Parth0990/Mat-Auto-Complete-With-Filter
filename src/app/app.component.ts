import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';

export class filteredOption {
  ObjId: number;
  ObjName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myControl = new FormControl('');
  OptionObj: filteredOption[] = [
    {
      ObjId: 1,
      ObjName: 'test'
    },
    {
      ObjId: 2,
      ObjName: 'Demo'
    }
  ];
  filteredOption: Observable<filteredOption[]>;
  
 constructor(){}
  ngOnInit(){
    this.filteredOption = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || '')),
    );
  }

  filter(val): any[]{
    const filterVal = val;
    return this.OptionObj.filter((item) => item["ObjName"].toLowerCase().includes(filterVal));
  }

  displayfn(subject: filteredOption){
    return subject && subject.ObjName ? subject.ObjName : undefined;
  }

  clear(){
    this.myControl.setValue('');
  }
}
