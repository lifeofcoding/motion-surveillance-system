
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {Observable} from 'rxjs';

import { Camera } from './../_helpers/camera';
import { CameraService } from './../_services/camera.service';
import {NgbdSortableHeader, SortEvent} from '../_helpers/sortable.directive';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  cameraID: number;
  cameraClient: string;
  cameraLocation: string;
  
  ngOnInit() {
  }

  cameras$: Observable<Camera[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: CameraService) {
    this.cameras$ = service.cameras$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  onSelectUpdate(camera){
    this.cameraID = camera.cameraID;
    this.cameraClient = camera.cameraClient;
    this.cameraLocation = camera.cameraLocation;
    console.log(this.cameraID);
    console.log(this.cameraClient);
    console.log(this.cameraLocation);
    
    
    
  }
}
