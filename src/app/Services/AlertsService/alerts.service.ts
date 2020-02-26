import { Injectable } from '@angular/core';
import { AngularBootstrapToastsService } from 'angular-bootstrap-toasts';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class AlertsService {
    
    constructor( private toastsService: AngularBootstrapToastsService) { }

    public ContainerPlacement = new FormGroup({
        position: new FormControl('bottomRight')
    });

    public showNotification(Title: string, Text: string, Duration: number, Type: string)
    {
        let ToastForm = new FormGroup({
            text: new FormControl(Text),
            title: new FormControl(Title),
            duration: new FormControl(Duration),
            //iconClass: new FormControl('fas fa-heart text-danger'),
            titleClass: new FormControl(Type),
            bodyClass: new FormControl(Text == null ? 'remove' : Type),
            toastClass: new FormControl(Type),
            progressLineClass: new FormControl(),
            toolbarClass: new FormControl(''),
            //closeButtonClass: new FormControl(''),
            //showProgressLine: new FormControl(true),
            closeByClick: new FormControl(false),
            pauseDurationOnMouseEnter: new FormControl(true),
            
        });

        this.toastsService.showSimpleToast(ToastForm.value);
    }
}
