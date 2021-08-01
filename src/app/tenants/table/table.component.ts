import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Tenant } from './../../models/tenant.model';

@Component( {
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.scss' ]
} )
export class TableComponent implements OnInit {
  @Input( 'data' ) dataSource: Tenant[] = [];
  @Output() onChanges: EventEmitter<Tenant> = new EventEmitter();
  @Output() onRemove: EventEmitter<string> = new EventEmitter();
  displayedColumns = [ "name", "phone_number", "address", "debt", "action" ];
  constructor() { }

  ngOnInit(): void {
  }

  onBlur( changedCol: string, element: any, event: any ) {
    console.log( changedCol, element, event.target.value );
    if ( element[ changedCol ] !== event.target.value ) {
      const t: Tenant = { ...element, [ changedCol ]: event.target.value };
      this.onChanges.emit( t )
    }
  }

  remove( id: string ) {
    this.onRemove.emit( id )
  }

}