import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-mymodal',
	templateUrl: './modal-confirm.component.html'
})

export class ModalConfirmComponent implements OnInit {

	@Input() my_modal_title: any;
	@Input() my_modal_content: any;

	constructor(public activeModal: NgbActiveModal) { }

	ngOnInit() {
	}

}