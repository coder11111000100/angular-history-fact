import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css'],
})
export class ModalDialogComponent implements OnInit {
  @Input() message = '';
  @Output() close = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
}
