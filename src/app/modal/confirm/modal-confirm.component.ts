import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-mymodal',
	templateUrl: './modal-confirm.component.html'
})

export class ModalConfirmComponent implements OnInit {

	@Input() my_modal_title: any;
	@Input() my_modal_content: any;

	constructor(public activeModal: NgbActiveModal, private translate: TranslateService) { 
		this.translate.use("it");
	}

	ngOnInit() {
	}

}